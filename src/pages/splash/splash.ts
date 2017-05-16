import { TabsPage } from '../tabs/tabs';
import { OfferDataModel } from './../../app/model/OfferModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

 import { ServerDataModel, ServerDataModelDelegate } from './../../app/model/ServerDataModel-helper';
/*
  Generated class for the Splash page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers:[ServerDataModel]
})
export class SplashPage {

  public putdata = [];

  splash_data : Array<OfferDataModel> = [];
  temp : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public datamodel:ServerDataModel) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

   ionViewWillEnter()
 {
     this.datamodel.GetOfferPost();
     this.datamodel.homedelegate = this;
 }

   dataSourceUpdated(data)
  {
       this.putdata  = [];
       this.putdata = data;
       var temp = this.putdata.length;
       var test  = Math.random() % temp ;
       var intvalue = Math.trunc( test );
      this.splash_data = this.putdata[intvalue];

       console.log("splash page information ==>",this.splash_data);
 }

 onClickEnter()
 {
   this.navCtrl.push(TabsPage);
 }





}
