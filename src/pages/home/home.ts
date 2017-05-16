import { Console } from '@angular/compiler/src/private_import_core';
import { MyDataModel } from './../../app/model/DataModel';
import { serialize } from '@angular/compiler/src/i18n/serializers/xml_helper';

import { ServerDataModel,ServerDataModelDelegate } from './../../app/model/ServerDataModel-helper';
import { Http } from '@angular/http';
import { Service } from './../../providers/service';
import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import 'rxjs/add/operator/map';


import { NavController,ViewController,Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [Service,ServerDataModel]
})


export class HomePage implements ServerDataModelDelegate {

  headers_title:any;
  image_names:any;

  data_array:any;
  my_array : any;

  detailpage = DetailPage;
////////////////////////server data//////////////
  serverData : any ;
  keys : Array<MyDataModel> = [];
  temp : any;
  /////////////////////////////
  public  postsDataArray : Array<MyDataModel> = new Array<MyDataModel>();


  constructor( public plateform:Platform, public navCtrl: NavController, public viweCtrl : ViewController,public server :Service,public http: Http,public datamodel:ServerDataModel)
   {
     this.navCtrl = navCtrl;
     this.plateform = plateform;
     //this.initDataArray();


  }

ionViewWillEnter()
{

  ///////////////////////////////this array is used of hometab page//////////////////////////////////////////////////////
    this.datamodel.homedelegate = this;
    //this.my_array = this.datamodel.initHomeDataArray();
   //  this.datamodel.insertdataToMyDataModel();

    //  this.datamodel.getHomeData();
     this.datamodel.SendPost("0");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
  dataSourceUpdated(data)
  {
    this.keys = [];
      console.log("delegatedata ==>",data)
      this.postsDataArray = data;

      for (let index in this.postsDataArray)
    {

      this.temp = this.postsDataArray[index];

       this.keys.push(this.temp);
    }
     console.log("temp====>",this.keys)
  }


  initDataArray()
  {
      this.data_array = [
    {
            title: 'Featured',
            items: [
                {title: 'Property', imgurl: "img/property1.jpg"},
                {title: 'Motors', imgurl:"img/motor3.jpg" },
                {title: 'Electronics', imgurl:"img/elc1.jpg"}
            ]
    },
        {
            title: 'Services',
            items: [
                {title: 'Pack & Move', imgurl: "img/pack1.jpg"},
                {title: 'General Contracting', imgurl:"img/contracting.jpg" },
                {title: 'Satellite', imgurl:"img/satellite.jpg"},
                {title: 'Nannies & Laborers', imgurl:"img/2.jpg"}
            ]
        },
        {
            title: 'Family',
            items: [
                {title: 'Man', imgurl: "img/man.jpg"},
                {title: 'Woman', imgurl:"img/woman.jpg" },
                {title: 'Children', imgurl:"img/children.jpg"},
                {title: 'Gift & Watches', imgurl:"img/gift.jpg"}
            ]
        }
    ];
  }


    gotoNextPage(id)
  {

    //var navOptions = { animate : true, direction:'back'};
    //  var navOptions = {
    //   animation: 'ios-transition'};
    // this.navCtrl.push(DetailPage,{},{animate:true,direction:'back'});
     this.navCtrl.push(DetailPage,{
       item_id : id
     });

    //this.navCtrl.setRoot(DetailPage);
  }

}
