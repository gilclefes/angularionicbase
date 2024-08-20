import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { SplashScreen } from "@capacitor/splash-screen";
import { Preferences } from "@capacitor/preferences";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { HistoryHelperService } from "./utils/history-helper.service";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { Capacitor } from "@capacitor/core";
import { environment } from "../environments/environment";
import { LOCAL_STORAGE } from "@ng-web-apis/common";

import {
  FirebaseMessaging,
  GetTokenOptions,
} from "@capacitor-firebase/messaging";
import { AdminServiceService } from "./services/admin-service.service";
import { UserDeviceTokenDto } from "./services/admin-models.service";
import { initializeApp } from "firebase/app";
//import { register } from "swiper/angular";

//register();

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: [
    "./side-menu/styles/side-menu.scss",
    "./side-menu/styles/side-menu.shell.scss",
    "./side-menu/styles/side-menu.responsive.scss",
  ],
})
export class AppComponent {
  appPages = [
    {
      title: "Categories",
      url: "/app/categories",
      ionicIcon: "list-outline",
    },
    {
      title: "Profile",
      url: "/app/user",
      ionicIcon: "person-outline",
    },
    {
      title: "Contact Card",
      url: "/contact-card",
      customIcon: "./assets/custom-icons/side-menu/contact-card.svg",
    },
    {
      title: "Notifications",
      url: "/app/notifications",
      ionicIcon: "notifications-outline",
    },
  ];

  accountPages = [
    {
      title: "Log In",
      url: "/auth/login",
      ionicIcon: "log-in-outline",
    },
    {
      title: "Sign Up",
      url: "/auth/signup",
      ionicIcon: "person-add-outline",
    },
    {
      title: "Getting Started",
      url: "/getting-started",
      ionicIcon: "rocket-outline",
    },
    {
      title: "404 page",
      url: "/page-not-found",
      ionicIcon: "alert-circle-outline",
    },
  ];

  textDir = "ltr";

  private destroySubject = new Subject();
  isLoggedIn = false;
  email: string;
  public token = "";

  // Inject HistoryHelperService in the app.components.ts so its available app-wide
  constructor(
    @Inject(LOCAL_STORAGE) readonly localStorage: Storage,
    public translate: TranslateService,
    public historyHelper: HistoryHelperService,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeMyApp();

    this.initializeFirebase();

    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
    this.setLanguage();
  }

  async initializeMyApp() {
    try {
      await SplashScreen.hide();
    } catch (err) {}
  }

  public async requestPermissions(): Promise<void> {
    await FirebaseMessaging.requestPermissions();
  }

  public IsAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public async getToken(): Promise<void> {
    const options: GetTokenOptions = {
      vapidKey: environment.firebase.vapidKey,
    };
    if (Capacitor.getPlatform() === "web") {
      options.serviceWorkerRegistration =
        await navigator.serviceWorker.register("firebase-messaging-sw.js");
    }
    const { token } = await FirebaseMessaging.getToken(options);

    this.token = token;

    Preferences.set({
      key: "deviceToken",
      value: this.token,
    });
  }

  public async initializeFirebase(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    initializeApp(environment.firebase);

    FirebaseMessaging.addListener("notificationReceived", (event) => {});
    FirebaseMessaging.addListener("notificationActionPerformed", (event) => {});

    this.requestPermissions();
    this.getToken();

    if (Capacitor.getPlatform() === "web") {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      navigator.serviceWorker.addEventListener("message", (event: any) => {
        if (Notification.permission === "granted") {
          // Check whether notification permissions have already been granted;
          // if so, create a notification
          const notification = new Notification(event.data.notification.title, {
            body: event.data.notification.body,
          });
          notification.onclick = (event) => {};
          // …
        } else if (Notification.permission !== "denied") {
          // We need to ask the user for permission
          Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              const notification = new Notification(
                event.data.notification.title,
                {
                  body: event.data.notification.body,
                }
              );
              notification.onclick = (event) => {};
            }
          });
        }
      });
    }
  }

  public setLanguage(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use("en");

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }

  public openTutorial(): void {
    // save key to mark the walkthrough as NOT visited because the user wants to check it out
    Preferences.set({
      key: "visitedWalkthrough",
      value: "false",
    });
    this.router.navigateByUrl("walkthrough");
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}
