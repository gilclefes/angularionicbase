import { Component } from "@angular/core";
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { ToastComponent } from "../../components/toastComponent";
import { AdminServiceService } from "../../services/admin-service.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./styles/forgot-password.page.scss"],
})
export class ForgotPasswordPage {
  forgotPasswordForm: UntypedFormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {
    this.forgotPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  recoverPassword(): void {
    let email = this.forgotPasswordForm.controls["email"].value;

    this.adminService.forgotPassword(email).subscribe({
      next: (result) => {
        this.toast.presentSuccessToast("Check you inbox to proceed");
        this.forgotPasswordForm.reset();

        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error);
      },
    });
  }
}
