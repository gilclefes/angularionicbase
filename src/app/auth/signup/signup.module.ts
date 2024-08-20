import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";

import { SignupPage } from "./signup.page";
import { TermsOfServicePage } from "../../terms-of-service/terms-of-service.page";
import { PrivacyPolicyPage } from "../../privacy-policy/privacy-policy.page";
import { ToastComponent } from "../../components/toastComponent";
import { Appheader } from "../../components/header/appheader.component";

const routes: Routes = [
  {
    path: "",
    component: SignupPage,
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
    Appheader,
  ],
  declarations: [SignupPage, TermsOfServicePage, PrivacyPolicyPage],
  providers: [ToastComponent],
})
export class SignupPageModule {}
