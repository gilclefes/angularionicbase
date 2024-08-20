import { Component, OnInit } from "@angular/core";
import {
  IonicModule,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { CityFormComponent } from "../city-form/city-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Appheader } from "../../components/header/appheader.component";
import { ComponentsModule } from "../../components/components.module";

import { IdtypeFormComponent } from "../idtype-form/idtype-form.component";

import { CountryFormComponent } from "../country-form/country-form.component";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Appheader,
  ],
})
export class AdminPageComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  async openCityModal() {
    const modal = await this.modalController.create({
      id: "updateModal",
      component: CityFormComponent,
      componentProps: {
        modalId: "updateModal",
      },
    });

    await modal.present();
  }

  async openCityPopover(event: any) {
    const popover = await this.popoverCtrl.create({
      component: CityFormComponent,
      componentProps: {
        isPopOver: true,
      },
      cssClass: "bottom-sheet-popover",
      event: event,
      translucent: true,
    });
    return popover.present();
  }

  async openIdTypePopover(event: any) {
    const popover = await this.popoverCtrl.create({
      component: IdtypeFormComponent,
      componentProps: {
        isPopOver: true,
      },
      cssClass: "bottom-sheet-popover",
      event: event,
      translucent: true,
    });
    return popover.present();
  }

  async openProvincePopover(event: any) {
    const popover = await this.popoverCtrl.create({
      component: CountryFormComponent,
      componentProps: {
        isPopOver: true,
      },
      cssClass: "bottom-sheet-popover",
      event: event,
      translucent: true,
    });
    return popover.present();
  }
}
