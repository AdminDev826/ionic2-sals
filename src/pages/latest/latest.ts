import { LatestSubPage } from './../latest-sub/latest-sub';
import { PostwantedthingPage } from './../postwantedthing/postwantedthing';
import { ActionSheetController } from 'ionic-angular/umd/components/action-sheet/action-sheet';
import { PostDataModel } from './../../app/model/PostDataModel';
import { Service } from './../../providers/service';
import { MyDataModel } from './../../app/model/DataModel';
import { ServerDataModel, ServerDataModelDelegate } from './../../app/model/ServerDataModel-helper';
import { PostPage } from './../post/post';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/*
  Generated class for the Latest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html',
   providers : [Service,ServerDataModel]
})
export class LatestPage implements ServerDataModelDelegate {


///////////////////////server data//////////////
  serverData : any ;
  keys : Array<MyDataModel> = [];
  temp : any;
  loaded = false;
  loading: any;
  refresher: any;
  /////////////////////////////
  public  postsDataArray : Array<PostDataModel> = new Array<PostDataModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams,public datamodel:ServerDataModel, private loadingCtrl: LoadingController) {

     this.navCtrl = navCtrl;
     this.datamodel.GetPostProducts();
     this.datamodel.homedelegate = this;
    this.loading = loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  }

 ionViewWillEnter()
 {
    //  this.datamodel.GetPostProducts();
    //  this.datamodel.homedelegate = this;
 }
 doRefresh(refresher){
    this.refresher = refresher;
    this.loaded = true;
    console.log(event);
    this.datamodel.GetPostProducts();
 }

  onPageDidEnter() {
    //   this.datamodel.GetPostProducts();
    //  this.datamodel.homedelegate = this;
  }

   dataSourceUpdated(data)
  {
      this.keys = [];
     // console.log("delegatedata ==>",data)
      this.postsDataArray = data;
      // this.postsDataArray = new Array<PostDataModel>();
      for (let index in this.postsDataArray)
    {

      this.temp = this.postsDataArray[index];

       this.keys.push(this.temp);
    }
    this.loading.dismiss();
    if(this.loaded){
      this.refresher.complete();
      this.loaded = false;
    }
    // console.log("temp====>",this.keys)
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestPage');
  }

  //  goWantedPage()
  // {
  //   this.navCtrl.push(WantedPage);

  // }
  goPostWnatedThing()
  {
    this.navCtrl.push(PostwantedthingPage);
  }

  goPostPage()
  {
    this.navCtrl.push(PostPage);
  }

  click_card(i)
  {
      var send_array = this.postsDataArray[i];
      var send_content = send_array["post_content"];
      var send_price   = send_array["post_price"];
      var send_title   = send_array["post_title"];
      var send_img_url = send_array["post_img_url"];
      var send_date    = send_array["post_date"];

       this.navCtrl.push(LatestSubPage,{
         content:send_content,
         price:send_price,
         title:send_title,
         img_url:send_img_url,
         date:send_date
       });

  }
}
