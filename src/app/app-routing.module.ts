import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },

  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
 
  {
    path: "walkthrough",
    loadChildren: () =>
      import("./walkthrough/walkthrough.module").then(
        (m) => m.WalkthroughPageModule
      ),
  },
  {
    path: "getting-started",
    loadChildren: () =>
      import("./getting-started/getting-started.module").then(
        (m) => m.GettingStartedPageModule
      ),
  },
  {
    path: "auth",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth/login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "auth/signup",
    loadChildren: () =>
      import("./auth/signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "confirm-email",
    loadComponent: () =>
      import("./auth/confirm-email/confirm-email.component").then(
        (m) => m.ConfirmEmailComponent
      ),
  },
  {
    path: "reset-password",
    loadComponent: () =>
      import("./auth/reset-password/reset-password.component").then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: "auth/users",
    loadComponent: () =>
      import("./auth/users/users.component").then((m) => m.UsersComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "auth/forgot-password",
    loadChildren: () =>
      import("./auth/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: "auth/resend-confirmation-mail",
    loadComponent: () =>
      import(
        "./auth/resendconfirmationmail/resendconfirmationmail.component"
      ).then((m) => m.ResendconfirmationmailComponent),
  },
  {
    path: "app",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "contact-card",
    loadChildren: () =>
      import("./contact-card/contact-card.module").then(
        (m) => m.ContactCardPageModule
      ),
  },
  {
    path: "forms-and-validations",
    loadChildren: () =>
      import("./forms/validations/forms-validations.module").then(
        (m) => m.FormsValidationsPageModule
      ),
  },
  {
    path: "forms-filters",
    loadChildren: () =>
      import("./forms/filters/forms-filters.module").then(
        (m) => m.FormsFiltersPageModule
      ),
  },
  {
    path: "page-not-found",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },

  {
    path: "promos",
    loadChildren: () =>
      import("./deals/listing/deals-listing.module").then(
        (m) => m.DealsListingPageModule
      ),
  },
  {
    path: "adminfaqs",
    loadComponent: () =>
      import("./faqs/faqadmin/faqadmin.component").then(
        (m) => m.FaqadminComponent
      ),
  },

  {
    path: "faqs",
    loadComponent: () =>
      import("./faqs/clientfaq/clientfaq.component").then(
        (m) => m.ClientfaqComponent
      ),
  },
  {
    path: "firebase",
    redirectTo: "firebase/auth/sign-in",
    pathMatch: "full",
  },

  {
    path: "maps",
    loadChildren: () =>
      import("./maps/maps.module").then((m) => m.MapsPageModule),
  },
  {
    path: "video-playlist",
    loadChildren: () =>
      import("./video-playlist/video-playlist.module").then(
        (m) => m.VideoPlaylistPageModule
      ),
  },

  {
    path: "adminforms",
    loadComponent: () =>
      import("./adminforms/admin-page/admin-page.component").then(
        (m) => m.AdminPageComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "contactus",
    loadComponent: () =>
      import("./contactus/client-form/client-form.component").then(
        (m) => m.ContactUsFormComponent
      ),
  },

  {
    path: "donate",
    loadComponent: () =>
      import("./adminforms/donationpage/donationpage.component").then(
        (m) => m.DonationpageComponent
      ),
  },

  {
    path: "admincontactus",
    loadComponent: () =>
      import("./contactus/admin-form/admin-form.component").then(
        (m) => m.AdminContactUsFormComponent
      ),
  },

  {
    path: "**",
    redirectTo: "page-not-found",
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // This value is required for server-side rendering to work.
      initialNavigation: "enabledBlocking",
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
