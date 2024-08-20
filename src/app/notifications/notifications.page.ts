import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";

import { AdminServiceService } from "../services/admin-service.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: [
    "./styles/notifications.page.scss",
    "./styles/notifications.shell.scss",
  ],
})
export class NotificationsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  notifications: [];
  username = "";

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService,
    private authService: AuthService
  ) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.getUserOrderMessages();
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }

  getUserOrderMessages() {}
}
