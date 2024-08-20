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
import { ResetPasswordDto } from "../../services/admin-models.service";
import { ComponentsModule } from "../../components/components.module";

@Component({
  selector: "app-resendconfirmationmail",
  templateUrl: "./resendconfirmationmail.component.html",
  styleUrls: ["./resendconfirmationmail.component.scss"],
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
export class ResendconfirmationmailComponent implements OnInit {
  resendConfirmatinoMailForm: UntypedFormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
  };

  constructor(
    public router: Router,

    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {
    this.resendConfirmatinoMailForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
    });
  }

  ngOnInit() {}
  // Disable side menu for this page
  ionViewDidEnter(): void {
    //  this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    //  this.menu.enable(true);
  }

  confirmEmail(): void {
    let email = this.resendConfirmatinoMailForm.controls["email"].value;

    this.adminService.resendConfirmationEmail(email).subscribe({
      next: (result) => {
        this.toast.presentSuccessToast("Check you inbox to proceed");
        this.resendConfirmatinoMailForm.reset();

        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        // this.signupForm.reset();
        //how to display the content of the error

        this.toast.presentFailedToast(error.error);
        
      },
    });
  }
}
