import { CommonModule } from "@angular/common";
import { Component, HostBinding, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Appheader } from "../components/header/appheader.component";
import { ToastComponent } from "../components/toastComponent";
import { MenuController } from "@ionic/angular";

import { ComponentsModule } from "../components/components.module";
import { Router, RouterModule } from "@angular/router";

import { AuthService } from "../auth/auth.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [
    "./styles/home.page.scss",
    "./styles/home.shell.scss",
    "./styles/home.ios.scss",
    "./styles/home.md.scss",
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Appheader,
    ComponentsModule,
    RouterModule,
  ],
  providers: [ToastComponent],
})
export class HomeComponent implements OnInit {
  @HostBinding("class.is-shell") get isShell() {
    return true;
  }

  private destroySubject = new Subject();
  isLoggedIn = false;

  constructor(
    public menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  slidesOptions: any = {
    zoom: {
      toggle: false, // Disable zooming to prevent weird double tap zomming on slide images
    },
  };

  ngAfterViewInit() {
    const video = document.getElementById("myVideo") as HTMLVideoElement;
    video.muted = true;
    const playVideo = () => {
      video.play().catch((error) => {
        console.error("Error trying to play the video:", error);
      });
    };
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  tryYabo() {
    if (this.isLoggedIn) {
      this.router.navigate(["/myorders"]);
    } else {
      this.router.navigate(["/auth/signup"]);
    }
  }
}
