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
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
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
export class ResetPasswordComponent implements OnInit {
  token: string = "";
  signupForm: UntypedFormGroup;
  matching_passwords_group: UntypedFormGroup;

  validation_messages = {
    fullname: [{ type: "required", message: "Full name is required." }],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
    ],
    confirm_password: [
      { type: "required", message: "Confirm password is required" },
    ],
    matching_passwords: [{ type: "areNotEqual", message: "Password mismatch" }],
  };

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
      
    });

    this.matching_passwords_group = new UntypedFormGroup(
      {
        password: new UntypedFormControl(
          "",
          Validators.compose([Validators.minLength(5), Validators.required])
        ),
        confirm_password: new UntypedFormControl("", Validators.required),
      },
      (formGroup: UntypedFormGroup) => {
        return PasswordValidator.areNotEqual(formGroup);
      }
    );

    this.signupForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      fullname: new UntypedFormControl(
        "Test User",
        Validators.compose([Validators.required])
      ),
      matching_passwords: this.matching_passwords_group,
    });
  }

  ngOnInit() {}

  doSignup(): void {
    let signupRequest = <ResetPasswordDto>{};
    signupRequest.Email = this.signupForm.controls["email"].value;
    signupRequest.NewPassword = this.signupForm.get(
      "matching_passwords.password"
    ).value;

    signupRequest.Token = this.token;

    this.adminService.resetPassword(signupRequest).subscribe({
      next: (result) => {
        this.toast.presentSuccessToast("Password Reset has been successful");
        this.signupForm.reset();

        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      
      },
    });
  }
}
