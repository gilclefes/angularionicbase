import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Appheader } from "../components/header/appheader.component";
import { ToastComponent } from "../components/toastComponent";

import { AdminServiceService } from "../services/admin-service.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],

  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Appheader,
  ],
  providers: [ToastComponent],
})
export class DashboardComponent implements OnInit {
  today = new Date().toISOString();
  endDate = new Date().toISOString();
  startDate = new Date(
    new Date().setDate(new Date().getDate() - 7)
  ).toISOString();
  orderStats: any = {};
  constructor(
    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {}

  ngOnInit() {
    this.getStats();
  }

  async GetOrderStats() {
    //check if start date is less of equal to enddate
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.toast.presentFailedToast(
        "Start date cannot be greater than end date"
      );
      return;
    }
    this.getStats();
  }

  getStats() {}
}
