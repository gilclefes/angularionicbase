import { Component } from "@angular/core";
import {
	Validators,
	UntypedFormGroup,
	UntypedFormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { LoginResult } from "../login-result";
import { AuthService } from "../auth.service";
import { LoginRequest } from "../login-request";
import { ToastComponent } from "../../components/toastComponent";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./styles/login.page.scss"],
})
export class LoginPage {
	loginForm: UntypedFormGroup;
	title?: string;
	loginResult?: LoginResult;

	validation_messages = {
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
	};

	constructor(
		public router: Router,
		public menu: MenuController,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private toast: ToastComponent,
	) {
		this.loginForm = new UntypedFormGroup({
			email: new UntypedFormControl(
				"",
				Validators.compose([
					Validators.required,
					Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
				]),
			),
			password: new UntypedFormControl(
				"",
				Validators.compose([Validators.minLength(5), Validators.required]),
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

	doLogin(): void {
		let loginRequest = <LoginRequest>{};
		loginRequest.Email = this.loginForm.controls["email"].value;
		loginRequest.Password = this.loginForm.controls["password"].value;

		this.authService.login(loginRequest).subscribe({
			next: (result) => {
				this.loginResult = result;
				if (result.success) {
					this.router.navigate(["app/user"]);
				}
			},
			error: (error) => {
				console.log("Error Occured", JSON.stringify(error));
				this.toast.presentFailedToast(error.error.FailedLogin);

				this.loginResult = error.error;
			},
		});
	}

	goToForgotPassword(): void {}

	doFacebookLogin(): void {
		this.router.navigate(["app/categories"]);
	}

	doGoogleLogin(): void {
		this.router.navigate(["app/categories"]);
	}

	doTwitterLogin(): void {
		this.router.navigate(["app/categories"]);
	}

	doAppleLogin(): void {
		this.router.navigate(["app/categories"]);
	}
}
