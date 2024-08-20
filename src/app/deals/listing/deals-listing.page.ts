import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { AdminServiceService } from "../../services/admin-service.service";
import { ToastComponent } from "../../components/toastComponent";

import { environment } from "../../../environments/environment";

@Component({
  selector: "app-deals-listing",
  templateUrl: "./deals-listing.page.html",
  styleUrls: [
    "./styles/deals-listing.page.scss",
    "./styles/deals-listing.shell.scss",
    "./styles/deals-listing.ios.scss",
  ],
})
export class DealsListingPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)

  listing = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {}

  ngOnInit(): void {
    this.getPromoCodes();
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {}

  getPromoCodes() {}
}
