import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

 items : String[];
 country : any;

  constructor(public navCtrl: NavController) {
        this.items = ["Region","Language","Account login","Post ad","favorite","contacts Us","about Us"];
        this.country = ["United States","United Kindom","China"]     
  }

}
