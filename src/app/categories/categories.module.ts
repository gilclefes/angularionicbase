import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../components/components.module";

import { CategoriesPage } from "./categories.page";
import { Appheader } from "../components/header/appheader.component";

const categoriesRoutes: Routes = [
  {
    path: "",
    component: CategoriesPage,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Appheader,
    RouterModule.forChild(categoriesRoutes),
    ComponentsModule,
  ],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
