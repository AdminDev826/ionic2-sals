import { OfferDataModel } from './OfferModel';
import { Global } from './global';
import { TreeModel } from './TreeDataModel';
import { PostDataModel } from './PostDataModel';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MyDataModel } from './DataModel';


// import { Transfer, File } from 'ionic-native';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/Observable/throw";
declare var cordova : any;

export interface ServerDataModelDelegate
{
   dataSourceUpdated(any);
}

@Injectable()
export class ServerDataModel
{
  public data_receive = {};
  public     my_array : any;
  loading: Loading;

  public  url ="http://sale4allz.com/ws/get_categories.php?parent_id=0 ";
 // public _http: Http;

  public  homedata_array :      Array<MyDataModel> = new Array<MyDataModel>();
  public  postData_array :      Array<PostDataModel> = new Array<PostDataModel>();
  public  wantedData_array :    Array<TreeModel> = new Array<TreeModel>();
  public  offferData_array :    Array<OfferDataModel> = new Array<OfferDataModel>();

  public homedelegate :   ServerDataModelDelegate;

  // constructor(public _http:Http)
  constructor(public _http: Http, public loadingCtrl: LoadingController,public toastCtrl: ToastController)
  {
    // this.my_array = this.initHomeDataArray();
    // this.insertdataToMyDataModel();
  }

ionViewWillEnter()
{

}

//////////////////////////////mobile amd server communication content///////////////////////////
   SendPost(nextid)
  {
        var temp_array = new Array<MyDataModel>();
        var temp_url = 'http://sale4allz.com/ws/get_categories.php';
        // var data = JSON.stringify({'parent_id':nextid});
//////////////////////////very important/////////////////////////////////
        var Form_data = new FormData();
        Form_data.append('parent_id',nextid);
//////////////////////////////////////////////////////////////////////////
        this._http.post(temp_url,Form_data).map(res =>res.json())
        .subscribe(res => {

        for(let index in res["items"])
        {
            var TempDataModel = new MyDataModel(res["items"][index]);
           temp_array.push(TempDataModel);
        }

        this.homedelegate.dataSourceUpdated(temp_array)
        }, error => {
            console.log("Oooops!");
        });
  ///////////////////////////////////////////////////////////////////////////////
   }

   GetPostProducts()
   {

        var temp_array = new Array<PostDataModel>();
        var temp_url = 'http://sale4allz.com/ws/get_user_posts.php';
        // var data = JSON.stringify({'parent_id':nextid});
//////////////////////////very important/////////////////////////////////
        var Form_data = new FormData();
        Form_data.append('profile_id', Global.profile_id);
        Form_data.append('country', Global.selected_country);

        console.log(Global.selected_country + "--------- selected_country");
//////////////////////////////////////////////////////////////////////////
        this._http.post(temp_url,Form_data).map(res =>res.json())
        .subscribe(res => {
        for(let index in res["items"])
        {
            var TempDataModel = new PostDataModel(res["items"][index]);
            temp_array.push(TempDataModel);
        }

        console.log("postarray==========>",this.postData_array);
        this.homedelegate.dataSourceUpdated(temp_array)

        }, error => {
            console.log("Oooops!");
        });
  ///////////////////////////////////////////////////////////////////////////////
   }

   GetTreeCategoryInformation()
   {
      var temp_url = 'http://sale4allz.com/ws/categories_tree.php';

      var send_data = new FormData();
      send_data.append('lang','en');

      this._http.post(temp_url,send_data).map(res =>res.json())
        .subscribe(res => {
          console.log("wantedResponse==>",res);
        for(let index in res["items"])
        {
            var TempDataModel = new TreeModel(res["items"][index]);
            this.wantedData_array.push(TempDataModel);
        }

        console.log("postarray==========>",this.postData_array);
        this.homedelegate.dataSourceUpdated(this.wantedData_array)

        }, error => {
            console.log("Oooops!");
        });
   }
/////////////////////////////////////////////get offer products function///////////////////////////////////
GetOfferPost()
{
  var temp_url = 'http://sale4allz.com/ws/get_offer_post.php';
      var temp_array = new Array<OfferDataModel>();
      var send_data = new FormData();
      send_data.append('lang','en');
      send_data.append('country', Global.selected_country);
      send_data.append('profile', Global.profile_id);

      console.log(Global.profile_id + "--------- profile_id");

      this._http.post(temp_url,send_data).map(res =>res.json())
        .subscribe(res => {
          console.log("wantedResponse==>",res);
         for(let index in res["item"])
         {
             var TempDataModel = new OfferDataModel(res["item"][index]);
            temp_array.push(TempDataModel);
         }

        console.log("postarray==========>",this.offferData_array);
        this.homedelegate.dataSourceUpdated(temp_array)

        }, error => {
            console.log("Oooops!");
        });

}

/////////////////////////////////////////////get post information with category id////////////////////////////////
GetPostFromCategoryId(cate_id)
{
   var temp_url = 'http://sale4allz.com/ws/get_postinformation.php';
    var temp_array = new Array<PostDataModel>();

  console.log("next id ==>",cate_id);
   var send_data = new FormData();
   send_data.append('category_id',cate_id);

   this._http.post(temp_url,send_data).map(res =>res.json())
        .subscribe(res => {
          console.log("seeeeeeeeeeeeeeee==>",res);
           for(let index in res["items"])
         {
             var TempDataModel = new PostDataModel(res["items"][index]);
             temp_array.push(TempDataModel);
         }
       this.homedelegate.dataSourceUpdated(temp_array)
        }, error => {
            console.log("Oooops!");
        });

}

}
