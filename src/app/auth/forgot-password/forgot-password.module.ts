import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from "../../components/components.module";

import { ForgotPasswordPage } from "./forgot-password.page";
import { ToastComponent } from "../../components/toastComponent";

const routes: Routes = [
  {
    path: "",
    component: ForgotPasswordPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [ForgotPasswordPage],
  providers: [ToastComponent],
})
export class ForgotPasswordPageModule {}
