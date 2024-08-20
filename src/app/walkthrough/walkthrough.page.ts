import {
  Inject,
  PLATFORM_ID,
  Component,
  AfterViewInit,
  ViewChild,
  HostBinding,
  NgZone,
  OnInit,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import { Preferences } from "@capacitor/preferences";

import { MenuController } from "@ionic/angular";





@Component({
  selector: "app-walkthrough",
  templateUrl: "./walkthrough.page.html",
  styleUrls: [
    "./styles/walkthrough.page.scss",
    "./styles/walkthrough.shell.scss",
    "./styles/walkthrough.responsive.scss",
  ],
})
export class WalkthroughPage implements AfterViewInit, OnInit {


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    public menu: MenuController,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // save key to mark the walkthrough as visited so the next time the user visits the app, he would be redirected to log in
    Preferences.set({
      key: "visitedWalkthrough",
      value: "true",
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

  ngAfterViewInit(): void {
    // Accessing slides in server platform throw errors
   
  }

  

  public swiperInit(): void {
    // console.log('swiperInit');
  }

  public slideWillChange(): void {
    // console.log('slideWillChange');
  }



  public skipWalkthrough(): void {
    // Skip to the last slide
    
  }
}
