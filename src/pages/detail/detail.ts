import {Component} from '@angular/core';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ChatroomPage} from '../../pages/chatroom/chatroom';
import {UserserviceProvider} from '../../providers/userservice/userservice';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage
{
  offer_address: string = null;
  child_age: string     = null;
  start_time: string    = null;
  duration              = null;
  other_name            = null;
  chat_title            = null;
  other_id: string      = null;
  deal: string          = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    var offer     = this.navParams.get('offer');
    this.other_id = this.navParams.get('id');
    console.log('offer: ' + JSON.stringify(offer));
    this.offer_address = offer.offer_address;
    this.other_name    = offer.firstName + ' ' + offer.lastName;
    this.chat_title    = 'Chat with ' + this.other_name;
    var date           = new Date(this.userServiceProvider.getKidBirthday());
    // console.log('date: ' + date);

    var time_str   = distanceInWordsToNow(date);
    this.child_age = time_str;
    var my_name    = this.userServiceProvider.getFirstName();
  }

  startChanged()
  {
    console.log('start_time: ' + this.start_time);
  }

  durationChanged()
  {
    console.log('duratoin: ' + this.duration);
  }

  confirm()
  {
    this.deal = this.other_name + ' will take care of ' +
        this.userServiceProvider.getFirstName() + '\'s kid (' + this.child_age +
        ' old) from ' + this.start_time + ' for ' + this.duration +
        ' hours, at ' + this.offer_address;
    console.log('deal: ' + this.deal);

    console.log('chat with ' + this.other_name);
    this.navCtrl.push(ChatroomPage, {
      otherUserId: this.other_id,
      deal: this.deal,
    });
  }
}
