import {Component} from '@angular/core';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ChatroomPage} from '../../pages/chatroom/chatroom';
import {ChatServiceProvider} from '../../providers/chat-service/chat-service';
import {UserserviceProvider} from '../../providers/userservice/userservice';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

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
    ref.on('child_added', data => {
      var otherUserId = data.val().other_user_id;
      this.userServiceProvider.lookupUserData(
          otherUserId,
          userData => {
            this.chat_rooms.push({
              other_user_id: otherUserId,
              other_user_name: userData.firstName,
            });
          },
          err => {
            alert(err);
          });

      return false;
    });
  }

  ionViewDidEnter()
  {
    var uid  = this.userServiceProvider.getUserId();
    var name = this.userServiceProvider.getFirstName();
  }

  openChat(otherUserId)
  {
    console.log('open chat: ' + otherUserId);
    this.navCtrl.push(ChatroomPage, {otherUserId: otherUserId});
  }
}
