import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


import { DealsListingPage } from './deals-listing.page';
import { ToastComponent } from '../../components/toastComponent';
import { Appheader } from '../../components/header/appheader.component';


const routes: Routes = [
  {
    path: '',
    component: DealsListingPage,
 
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,Appheader
  ],
  declarations: [
    DealsListingPage
  ],
  providers: [
    ToastComponent
  ]
})
export class DealsListingPageModule {}
