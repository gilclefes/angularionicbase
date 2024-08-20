import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { UserProfileModel } from "./user-profile.model";
import { AlertController, PopoverController } from "@ionic/angular";

import { LanguageService } from "../../language/language.service";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "../../auth/auth.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { UserDeviceTokenDto } from "../../services/admin-models.service";

import { ToastComponent } from "../../components/toastComponent";

import { Preferences } from "@capacitor/preferences";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: [
    "./styles/user-profile.page.scss",
    "./styles/user-profile.shell.scss",
    "./styles/user-profile.ios.scss",
    "./styles/user-profile.md.scss",
  ],
})
export class UserProfilePage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)

  profile: UserProfileModel;
  available_languages = [];
  translations;
  email: string;
  clientImageUrl: string;
  providerImageUrl: string;
  partnerImageUrl: string;

  /*  @HostBinding("class.is-shell") get isShell() {
    return this.profile && this.profile.isShell ? true : false;
  } */

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    public languageService: LanguageService,
    public alertController: AlertController,
    private authService: AuthService,
    private adminService: AdminServiceService,
    private popoverCtrl: PopoverController,

    private toast: ToastComponent
  ) {
    this.email = this.authService.getUsername();
  }

  getImage(fileName: string): string {
    return this.adminService.getImageURL(fileName);
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: "deviceToken" });
    if (value) {
      let userDeviceTokenDto: UserDeviceTokenDto = {
        email: this.email,
        deviceToken: value,
      };
      this.saveToken(userDeviceTokenDto);
    }
    // this.translate.onLangChange.subscribe(() => this.getTranslations());
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {}

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate
      .getTranslation(this.translate.currentLang)
      .subscribe((translations) => (this.translations = translations));
  }

  saveToken(userDeviceTokenDto: UserDeviceTokenDto) {
    this.adminService.postUserDeviceToken(userDeviceTokenDto).subscribe({
      next: (result) => {},
      error: (error) => {
        this.toast.presentFailedToast(
          error.error.message || environment.genericError
        );
      },
    });
  }
}
