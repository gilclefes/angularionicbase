import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { UserService } from "../user.service";
import { UserProfilePage } from "./user-profile.page";
import { ComponentsModule } from "../../components/components.module";
import { LanguageService } from "../../language/language.service";
import { TranslateModule } from "@ngx-translate/core";
import { Appheader } from "../../components/header/appheader.component";
import { ToastComponent } from "../../components/toastComponent";

const routes: Routes = [
  {
    path: "",
    component: UserProfilePage,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ComponentsModule,
    Appheader,
    RouterModule.forChild(routes),
  ],
  declarations: [UserProfilePage],
  providers: [UserService, LanguageService, ToastComponent],
})
export class UserProfilePageModule {}
