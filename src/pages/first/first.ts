import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from "./../../app/model/global";
import { LoginPage } from "../login/login";



@Component({
  selector: 'page-first',
  templateUrl: 'first.html'
})
export class FirstPage {

  selected_country = [true, false, false];
  selectedLanguage = "English";
  isEnglish = true;
  isArabic = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }
  selected(i){
    if(i == 0){
      this.isEnglish = true;
      this.selectedLanguage = "English";
      this.isArabic = false;
    }else if(i == 1){
      this.selectedLanguage = "Arabic";
      this.isEnglish = false;
      this.isArabic = true;
    }
  }
  selectedCountry(ii){
    for(let i in this.selected_country){
      if(ii == i){
        this.selected_country[i] = true;
      }else{
        this.selected_country[i] = false;
      }
    }
    if(ii == 0){
      Global.selected_country = "Kuwait";
    }else if(ii == 1){
      Global.selected_country = "KSA";
    }else if(ii == 1){
      Global.selected_country = "Jordan"
    }
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}
