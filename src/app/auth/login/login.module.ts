import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from "../../components/components.module";

import { LoginPage } from "./login.page";
import { ToastComponent } from "../../components/toastComponent";

const routes: Routes = [
  {
    path: "",
    component: LoginPage,
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
  declarations: [LoginPage],
  providers: [ToastComponent],
})
export class LoginPageModule {}
