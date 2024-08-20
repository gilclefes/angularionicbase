import { Component, HostBinding, NgZone } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";

import { MenuController } from "@ionic/angular";





@Component({
  selector: "app-getting-started",
  templateUrl: "./getting-started.page.html",
  styleUrls: [
    "./styles/getting-started.page.scss",
    "./styles/getting-started.shell.scss",
    "./styles/getting-started.responsive.scss",
  ],
})
export class GettingStartedPage {
  @HostBinding("class.last-slide-active") isLastSlide = false;

 
  gettingStartedForm: UntypedFormGroup;

  constructor(public menu: MenuController, private ngZone: NgZone) {
    this.gettingStartedForm = new UntypedFormGroup({
      browsingCategory: new UntypedFormControl("men"),
      followingInterests: new UntypedFormGroup({
        tops: new UntypedFormControl(true),
        dresses: new UntypedFormControl(),
        jeans: new UntypedFormControl(),
        jackets: new UntypedFormControl(true),
        shoes: new UntypedFormControl(),
        glasses: new UntypedFormControl(),
      }),
    });
  }

  // Disable side menu for this page
  public ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  public ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  
  
}
