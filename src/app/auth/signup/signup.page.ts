import { Component } from "@angular/core";
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  ModalController,
  MenuController,
  IonRouterOutlet,
} from "@ionic/angular";

import { TermsOfServicePage } from "../../terms-of-service/terms-of-service.page";
import { PrivacyPolicyPage } from "../../privacy-policy/privacy-policy.page";
import { PasswordValidator } from "../../validators/password.validator";
import { AdminServiceService } from "../../services/admin-service.service";
import { RegisterDto } from "../../services/admin-models.service";
import { ToastComponent } from "../../components/toastComponent";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./styles/signup.page.scss"],
})
export class SignupPage {
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
    public router: Router,
    public modalController: ModalController,
    public menu: MenuController,
    private routerOutlet: IonRouterOutlet,
    private adminService: AdminServiceService,
    private toast: ToastComponent
  ) {
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

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage,

      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage,

      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  doSignup(): void {
    let signupRequest = <RegisterDto>{};
    signupRequest.Email = this.signupForm.controls["email"].value;
    signupRequest.Password = this.signupForm.get(
      "matching_passwords.password"
    ).value;

    signupRequest.Name = this.signupForm.controls["email"].value;

    this.adminService.registerUser(signupRequest).subscribe({
      next: (result) => {
        this.toast.presentSuccessToast("Registration has been succesfful");
        this.signupForm.reset();

        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        // this.signupForm.reset();
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  doFacebookSignup(): void {
    
    this.router.navigate(["app/categories"]);
  }

  doGoogleSignup(): void {
   
    this.router.navigate(["app/categories"]);
  }

  doTwitterSignup(): void {
 
    this.router.navigate(["app/categories"]);
  }

  doAppleSignup(): void {
   
    this.router.navigate(["app/categories"]);
  }
}
