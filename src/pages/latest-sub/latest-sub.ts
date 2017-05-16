import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LatestSub page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-latest-sub',
  templateUrl: 'latest-sub.html'
})
export class LatestSubPage {

  public sub_content : any;
  public sub_title  : any;
  public sub_price  : any;
  public sub_url    : any;
  public sub_date   : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sub_content = navParams.get("content");
    this.sub_price   = navParams.get("price");
    this.sub_title   = navParams.get("title");
    this.sub_url     = navParams.get("img_url");
    this.sub_date    = navParams.get("date");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestSubPage');
  }

}
