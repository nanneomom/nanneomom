import {Component} from '@angular/core';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-detail', templateUrl: 'detail.html',})
export class DetailPage
{
  offer_address: string = null;
  child_age: string     = null;
  start_time: string    = null;
  duration: number      = null;
  other_name            = null;
  chat_title            = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    var offer = this.navParams.get('offer');
    console.log('offer: ' + JSON.stringify(offer));
    this.offer_address = offer.offer_address;
    this.other_name    = offer.firstName + ' ' + offer.lastName;
    this.chat_title    = 'Chat with ' + this.other_name;
    var date           = new Date(this.userServiceProvider.getKidBirthday());
    // console.log('date: ' + date);

    var time_str = distanceInWordsToNow(date);
    // console.log('date: ' + time_str);
    this.child_age = time_str;
  }

  confirm()
  {
    console.log('chat with ' + this.other_name);
  }
}
