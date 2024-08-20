import { Component, Input, OnInit } from "@angular/core";
import {
	FormsModule,
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from "@angular/forms";
import {
	IonicModule,
	ModalController,
	PopoverController,
} from "@ionic/angular";
import { NgSelectModule } from "@ng-select/ng-select";
import { AuthService } from "../../auth/auth.service";
import { ComponentsModule } from "../../components/components.module";
import { ToastComponent } from "../../components/toastComponent";
import { FaqDto } from "../../services/admin-models.service";
import { AdminServiceService } from "../../services/admin-service.service";

import { CommonModule } from "@angular/common";
import { Appheader } from "../../components/header/appheader.component";
import { environment } from "../../../environments/environment";

@Component({
	selector: "app-clientfaq",
	templateUrl: "./clientfaq.component.html",
	styleUrls: ["./clientfaq.component.scss"],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		NgSelectModule,
		ComponentsModule,
		Appheader,
	],
	providers: [ToastComponent],
})
export class ClientfaqComponent implements OnInit {
	FaqList: FaqDto[] = [];
	origFaqList: FaqDto[] = [];

	constructor(
		private authService: AuthService,
		private adminService: AdminServiceService,
		private modalController: ModalController,
		private popoverCtrl: PopoverController,
		private toast: ToastComponent,
	) {
		this.getFaqs();
	}

	ngOnInit() {}

	getFaqs() {
		this.adminService.getFaqsActive(1, 500).subscribe({
			next: (result) => {
				this.FaqList = result.data;
				this.origFaqList = result.data;
			},
			error: (error) => {
				this.toast.presentFailedToast(error.error.message || environment.genericError);
			},
		});
	}
}
