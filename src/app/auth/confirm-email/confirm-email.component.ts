import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IonRouterOutlet, IonicModule, ModalController } from "@ionic/angular";
import { MenuController } from "@ionic/angular/common";
import { Router } from "@angular/router";
import { ToastComponent } from "../../components/toastComponent";
import { AdminServiceService } from "../../services/admin-service.service";
import { PasswordValidator } from "../../validators/password.validator";
import {
  ConfirmEmailRequest,
  ResetPasswordDto,
} from "../../services/admin-models.service";
import { ComponentsModule } from "../../components/components.module";

@Component({
  selector: "app-confirm-email",
  templateUrl: "./confirm-email.component.html",
  styleUrls: ["./confirm-email.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    ComponentsModule,
  ],
  providers: [ToastComponent],
})
export class ConfirmEmailComponent implements OnInit {
  token: string = "";
  userId: string = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,

    private routerOutlet: IonRouterOutlet,
    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"];
      this.userId = params["userId"];
    
    });
  }

  ngOnInit() {}

  confirmEmail(): void {
    let confirmEmailRequest = <ConfirmEmailRequest>{};
    confirmEmailRequest.token = this.token;
    confirmEmailRequest.userId = this.userId;

    this.adminService.confirmEmail(confirmEmailRequest).subscribe({
      next: (result) => {
        this.toast.presentSuccessToast(
          "Email Confirmation has been successful"
        );
        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        this.toast.presentSuccessToast(error.message);
   
      },
    });
  }
}
