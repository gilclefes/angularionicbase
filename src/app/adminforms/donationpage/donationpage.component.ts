import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Appheader } from "../../components/header/appheader.component";
import { ToastComponent } from "../../components/toastComponent";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-donationpage",
  templateUrl: "./donationpage.component.html",
  styleUrls: ["./donationpage.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Appheader,
    RouterModule,
  ],
  providers: [ToastComponent],
})
export class DonationpageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
