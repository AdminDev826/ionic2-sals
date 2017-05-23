import { SplashPage } from '../pages/splash/splash';
import { Service } from '../providers/service';
import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { FirstPage } from "../pages/first/first";


@Component({
  templateUrl: 'app.html'

})
export class MyApp {

  rootPage = FirstPage;
  providers: [Service]

  constructor(platform: Platform,events:Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // events.subscribe('user:login', () => {
    // this.loggedIn();
// });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

  }

  // loggedIn() {
  //     console.log("logged in");
  //   }
}
