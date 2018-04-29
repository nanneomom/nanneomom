import {Component} from '@angular/core';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-search', templateUrl: 'search.html',})

export class SearchPage
{
  public items: Array<any> = [];
  db_ref                   = null;

  constructor(    
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SearchPage');
    this.db_ref = this.userServiceProvider.onOfferChanged((key, value) => {
      this.items.push(value);
    });
  }
}
