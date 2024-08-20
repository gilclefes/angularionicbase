import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      // /app/ redirect
      {
        path: "",
        redirectTo: "orders",
        pathMatch: "full",
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../categories/categories.module").then(
                (m) => m.CategoriesPageModule
              ),
          },

          {
            path: "deals",
            loadChildren: () =>
              import("../deals/listing/deals-listing.module").then(
                (m) => m.DealsListingPageModule
              ),
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../user/profile/user-profile.module").then(
                (m) => m.UserProfilePageModule
              ),
          },
          {
            path: "friends",
            loadChildren: () =>
              import("../user/friends/user-friends.module").then(
                (m) => m.UserFriendsPageModule
              ),
          },
        ],
      },
      {
        path: "notifications",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../notifications/notifications.module").then(
                (m) => m.NotificationsPageModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TabsPageRoutingModule {}
