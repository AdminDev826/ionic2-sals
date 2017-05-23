import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Service } from "../../providers/service";
import { LatestPage } from "../latest/latest";
import { SplashPage } from "../splash/splash";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  phoneNumber = "";
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private service: Service,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goBack(){
    this.navCtrl.pop();
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ''
    });
    this.loading.present();
  }

  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  skip(){
    this.navCtrl.push(SplashPage);
  }
  login(){
    if(this.checkNumber()){
      this.showLoading();
      this.service.login(this.phoneNumber).subscribe(status => {
        this.loading.dismiss();
        if(status){
          this.showToast("Login Success !");
          this.navCtrl.push(SplashPage);
        }else{
          this.showToast("Login Failed !");
        }
      })
    }
  }
  checkNumber(){
    return true;
  }

}
