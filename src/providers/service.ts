import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Global } from "../app/model/global";

/*
  Generated class for the Service provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Service {

  posts : any = [];
  selectedCountry = "Kuwait";
  selectedLanguage = "English";

  constructor(public http: Http) {
    console.log('Hello Service Provider');

    //this.posts = null;
  }

  load() {
    //console.log('json called');
    return this.http.get("data/categories.json").map((response:Response)=>response.json());
  }

  login(phoneNumber){
    let url = "http://sale4allz.com/ws/login.php";
    var data = new FormData();
    data.append('phoneNumber', phoneNumber);

    return Observable.create(observer => {
      this.http.post(url, data).map((res=>res.json())).subscribe((res)=>{
        console.log(res.item[0]);
        if(res.item[0].profile_id == null){
          observer.next(false);
        }else{
          Global.profile_id = res.item[0].profile_id;
          observer.next(true);
        }
      })
    });
  }

}
