import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../components/components.module";

import { NotificationsPage } from "./notifications.page";

import { NotificationsService } from "../notifications/notifications.service";

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		ComponentsModule,
		RouterModule.forChild([
			{
				path: "",
				component: NotificationsPage,
			},
		]),
	],
	declarations: [NotificationsPage],
	providers: [NotificationsService],
})
export class NotificationsPageModule {}
