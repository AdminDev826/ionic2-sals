import { DetailSubPage } from './../detail-sub/detail-sub';
import { LoadingController } from 'ionic-angular/components/loading/loading';
import { Service } from '../../providers/service';
import { MyDataModel } from './../../app/model/DataModel';
import { ServerDataModel } from '../../app/model/ServerDataModel-helper';
import { Component } from '@angular/core';

import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers : [Service,ServerDataModel]
})
export class DetailPage {

   data_array:any;

   public firstParam : string;
   public  postsDataArray : Array<MyDataModel> = new Array<MyDataModel>();

   keys_detail : Array<MyDataModel> = [];
   temp_detail : any;

   constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public params :NavParams,public model :ServerDataModel,private loading:LoadingController)  {
    this.navCtrl = navCtrl;
   // this.initDataArray();
/////////////////////////////get parameter////////////////////////////////
    this.firstParam = params.get("item_id")
    //var int_firstparam =  +this.firstParam;
//////////////////////////////////////////////////////////////////////////
///////////////////////////get data from server///////////////////////////
     this.model.SendPost(this.firstParam);
///////////////////////////delegate function defintion///////////////////
    this.model.homedelegate = this;

//////////////////////////////////////////////////////////////////////////

  }

  dataSourceUpdated(data)
  {

      console.log("delegatedatadetail ==>",data)
      this.postsDataArray = data;
      console.log("clicked buttonid", this.postsDataArray);
      for (let index in this.postsDataArray)
    {

      this.temp_detail = this.postsDataArray[index];

       this.keys_detail.push(this.temp_detail);
    }
     console.log("temp====>",this.keys_detail)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
   // this.navCtrl.canGoBack();

  }

OnClickItem(id)
{
     this.navCtrl.push(DetailSubPage,{
       detail_item_id : id
     });
}

 goBack(){
     console.log('click close button');

     this.navCtrl.pop();
  }

    initDataArray()
  {
      this.data_array =
      [

        {
               flag:"true",
              items: [
                  {title: 'Property for Sale', imgurl: "img/property2.jpg"},
                  {title: 'For rent', imgurl:"img/pro1.jpg" },
                  {title: 'Switch Property', imgurl:"img/pro2.jpg"},
                   {title: 'International Real Estate', imgurl: "img/pro3.jpg"},
                  {title: 'Shops for sale', imgurl:"img/pro4.jpg" },
                  {title: 'Required property', imgurl:"img/pro5.jpg"},
              ],

          },

          {
              flag:"false",
              items: [
                  {title: 'Lands for sale', imgurl: "img/pro7.jpg"},
                  {title: 'Offices & Stores', imgurl:"img/pro1.jpg" },
                  {title: 'Serviced Property', imgurl:"img/pro2.jpg"},
                   {title: 'Chalets for sale', imgurl: "img/pro3.jpg"},
                  {title: 'Chalets for rent', imgurl:"img/pro4.jpg" },
                  {title: 'Farms for sale', imgurl:"img/pro5.jpg"},
              ],

          }

        ];
  }

}
