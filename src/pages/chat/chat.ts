import {Component} from '@angular/core';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ChatServiceProvider} from '../../providers/chat-service/chat-service';
import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-chat', templateUrl: 'chat.html',})
export class ChatPage
{
  public chat_rooms: Array<any> = [];
  db_ref                        = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public chatServiceProvider: ChatServiceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ChatPage');
    var uid = this.userServiceProvider.getUserId();

    var ref = firebase.database().ref('chatUsers/' + uid);
    ref.on('value', itemSnapshot => {
      itemSnapshot.forEach(itemSnap => {
        console.log('key: ' + itemSnap.key);
        console.log('val: ' + JSON.stringify(itemSnap.val()));
        this.chat_rooms.push(itemSnap.val());
        return false;
      });
    });
  }

  ionViewDidEnter()
  {
    var uid  = this.userServiceProvider.getUserId();
    var name = this.userServiceProvider.getFirstName();
    this.chatServiceProvider.updateSelfChat(uid, name);
  }

  openChat(otherUserId) {
    console.log('open chat: ' + otherUserId);
  }
}
