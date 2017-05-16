
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Global } from './../../app/model/global';
import { ServerDataModel } from '../../app/model/ServerDataModel-helper';
import { WantedPage } from './../wanted/wanted';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import * as $ from 'jquery';
declare var cordova : any;
/*
  Generated class for the Postwantedthing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-postwantedthing',
  templateUrl: 'postwantedthing.html',
  providers:[WantedPage,ServerDataModel]
})
export class PostwantedthingPage {

  public post_category_list = [];

  public post_desc  : any;

  lastImage: string = null;
  loading: Loading;

  constructor(public model:ServerDataModel, public navCtrl: NavController, public navParams: NavParams, public want_page:WantedPage,public actiionSheetCtrl:ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostwantedthingPage');
  }


   ionViewWillEnter()
 {
     this.post_desc = "";
 }

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



  clickPostButton()
  {
          // Destination URL
      var url = "http://sale4allz.com/admin/add_new_wanted_post.php";

      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      console.log("this content ==>", this.post_desc);
      var filename = this.lastImage;
        console.log(this.lastImage,targetPath);
      var options = {
        fileKey: "media_file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename,'content':this.post_desc}
      };

      const fileTransfer = new Transfer();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll()
        console.log("uploadeddata==>",data);
        this.presentToast('Succesful uploaded.');
      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });

      //this.model.addPostAD(this.post_title,this.post_price,this.post_desc,this.lastImage);
  }

  }

