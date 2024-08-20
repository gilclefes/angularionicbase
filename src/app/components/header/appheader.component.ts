import { Component, Input } from "@angular/core";

import { Router } from "@angular/router";

import { IonicModule, MenuController } from "@ionic/angular";


import { AuthService } from "../../auth/auth.service";
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/*
 */
@Component({
  selector: "app-header",
  templateUrl: "appheader.component.html",
  styleUrls: ["./appheader.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class Appheader {
  @Input() ptitle: string;

  private destroySubject = new Subject();
  isLoggedIn: boolean = false;

  getPtitle() {
    return this.ptitle;
  }

  constructor(
    public menuCtrl: MenuController,
    private router: Router,

    private authService: AuthService
  ) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  login() {
    this.router.navigate(["/auth/login"]);
  }

  register() {
    this.router.navigate(["/auth/signup"]);
  }

  contactus() {
    this.router.navigate(["/contactus"]);
  }

  donate() {
    this.router.navigate(["/donate"]);
  }

  home() {
    this.router.navigate(["/home"]);
  }
  dashboard() {
    this.router.navigate(["/dashboard"]);
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}
