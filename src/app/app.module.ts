import { SplashPage } from './../pages/splash/splash';
import { LatestSubPage } from './../pages/latest-sub/latest-sub';
import { PostwantedthingPage } from './../pages/postwantedthing/postwantedthing';
import { DetailSubPage } from './../pages/detail-sub/detail-sub';
import { ServerDataModel } from './model/ServerDataModel-helper';
import { Service } from './../providers/service';
//  import { JsonData } from './../providers/json-data';
import { PostPage } from './../pages/post/post';
import { LatestPage } from './../pages/latest/latest';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {MorePage} from '../pages/more/more';
import{DetailPage} from '../pages/detail/detail';
import{WantedPage} from '../pages/wanted/wanted';
import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MorePage,
    DetailPage,
    LatestPage,
    WantedPage,
    PostPage,
    DetailSubPage,
    PostwantedthingPage,
    LatestSubPage,
    SplashPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      // backButtonText : "Go back",
      // backButtonIcon : "arrow-back"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MorePage,
    DetailPage,
    LatestPage,
    WantedPage,
    PostPage,
    DetailSubPage,
    PostwantedthingPage,
    LatestSubPage,
    SplashPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},[Service]],
})
export class AppModule {}
