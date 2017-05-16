import { ServerDataModel } from './../../app/model/ServerDataModel-helper';
// import { JsonData } from './../../providers/json-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
 providers : [ServerDataModel]
})
export class AboutPage {

  putdata : any = [];

  current_date : string = new Date().toISOString();
  pass_time : any;
  post_date : string;

  constructor(public navCtrl: NavController,public model : ServerDataModel) {


    }


  ionViewWillEnter()
  {

    this.model.GetOfferPost();
    this.model.homedelegate = this;

  }

  dataSourceUpdated(data)
  {
      this.putdata = [];
      this.putdata = data;
      console.log("offer data===>", this.putdata);
  }
}
