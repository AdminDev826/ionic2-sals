import { PostDataModel } from './../../app/model/PostDataModel';
import { MyDataModel } from './../../app/model/DataModel';
import { Service } from './../../providers/service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServerDataModel } from '../../app/model/ServerDataModel-helper';

/*
  Generated class for the DetailSub page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-sub',
  templateUrl: 'detail-sub.html',
  providers : [Service,ServerDataModel]
})
export class DetailSubPage {


 public Array_sub_category : Array<PostDataModel> = new Array<PostDataModel>();

  model_sub_category = [];
  temp_detail : any;

 str_parm : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public model : ServerDataModel) {

       this.navCtrl = navCtrl;
       this.str_parm = navParams.get("detail_item_id")
       model.homedelegate = this;
   // this.initDataArray();

  }

  ionViewWillEnter()
  {
    /////////////////////////////get parameter////////////////////////////////

    //var int_firstparam =  +this.firstParam;
//////////////////////////////////////////////////////////////////////////
///////////////////////////get data from server///////////////////////////
     this.model.GetPostFromCategoryId(this.str_parm);
///////////////////////////delegate function defintion///////////////////


//////////////////////////////////////////////////////////////////////////
  }

    dataSourceUpdated(data)
  {
      console.log("sub_detail ==>",data)
      this.Array_sub_category = data;
      this.model_sub_category = [];
      console.log("sub_detail", this.Array_sub_category);
      for (let index in this.Array_sub_category)
    {

      this.temp_detail = this.Array_sub_category[index];

       this.model_sub_category.push(this.temp_detail);
    }
     console.log("modelsub===>",this.model_sub_category)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailSubPage');
  }

}
