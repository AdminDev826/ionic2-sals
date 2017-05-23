//////////////////////////////////////////////////POST AD CLASS  2017/4 ZHANG///////////////////////////////////////////////
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Global } from './../../app/model/global';
import { ServerDataModel } from '../../app/model/ServerDataModel-helper';
import { WantedPage } from './../wanted/wanted';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import * as $ from 'jquery';
import 'rxjs/add/operator/map';


declare var cordova : any;
/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers:[WantedPage,ServerDataModel]
})
export class PostPage{

  public post_category_list = [];
  public post_title : any;
  public post_price : any;
  public post_desc  : any;

  lastImage: string = null;
  loading: Loading;

  constructor(public model:ServerDataModel,
              public navCtrl: NavController,
              public navParams: NavParams,
              public want_page:WantedPage,
              public actiionSheetCtrl:ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController)
  {


    //  this.actionsheet = actionsheet;

  }

 ionViewWillEnter()
 {
     this.post_desc = "";
     this.post_title = "";
     this.post_price =  "";
      var str = Global.Static_category;
      $(".category").text(str);
 }


/////////////////////////////////////////////////////////////////get image from camera and gallery , save image , upload//////////////////////////////////////////////
 public presentActionSheet() {
    let actionSheet = this.actiionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
             this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
             this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}


    gotoWantedPage()
    {
      console.log("click category button")
      this.navCtrl.push(WantedPage,{});
    }

    selectPicture() {
       let cameraOptions = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
      }

      Camera.getPicture(cameraOptions)
        .then(file_uri => {
           this.lastImage = "data:image/jpeg;base64," + file_uri;
        },
        err => {
          this.lastImage = '';
          alert(err)
        });
    }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PostPage');
  }
///////////////////////////////////////////File Transer function(POST AD)///////////////////////////////////////////////////////////////////////////////////
//////this function send post title, post price, post description, post category id   to  backend server///////////////////////////////////////////////////
  clickPostButton()
  {
           // Destination URL
      var url = "http://sale4allz.com/admin/add_new_post_temp.php";

      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      var filename = this.lastImage;
        console.log(this.lastImage,targetPath);
      var options = {
        fileKey: "media_file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {
          'fileName': filename,
          'title':this.post_title,
          'price':this.post_price,
          'content':this.post_desc,
          'category_id':Global.Static_category_id,
          'profile': Global.profile_id,
          'Country': Global.selected_country
        }
      };
      console.log(options);

      const fileTransfer = new Transfer();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      // Use the FileTransfer to upload the image

      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll();
        console.log("uploadeddata==>",data.response);
        let strData = JSON.parse(data.response);
        console.log(strData.status);
        if(strData.item[0]){
          this.presentToast('succesful uploaded.');
          this.navCtrl.pop();
        }else{
          this.presentToast("You can not upload post . your free post limit reached. please contact admin to add more post");
        }

      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });

      //this.model.addPostAD(this.post_title,this.post_price,this.post_desc,this.lastImage);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }







