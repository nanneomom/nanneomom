import {Component} from '@angular/core';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ChatServiceProvider} from '../../providers/chat-service/chat-service';
import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-chatroom', templateUrl: 'chatroom.html',})
export class ChatroomPage
{
  editorMsg: string    = '';
  messages: Array<any> = [];
  db_ref               = null;
  roomId               = null;
  uid                  = null;
  userName             = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public chatServiceProvider: ChatServiceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ChatroomPage');
    var otherUserId = this.navParams.get('otherUserId');
    console.log('talking with uid=' + otherUserId);

    this.uid      = this.userServiceProvider.getUserId();
    this.userName = this.userServiceProvider.getFirstName() + ' ' +
        this.userServiceProvider.getLastName();

    if (this.uid > otherUserId)
    {
      this.roomId = this.uid + '_to_' + otherUserId;
    }
    else
    {
      this.roomId = otherUserId + '_to_' + this.uid;
    }

    this.db_ref = firebase.database().ref('chatRooms/' + this.roomId);
    this.db_ref.on('child_added', data => {
      this.messages.push(data.val());
    });
  }

  sendMsg()
  {
    console.log('sending: ' + this.editorMsg);
    this.chatServiceProvider.writeChat(
        this.roomId, this.uid, this.userName, this.editorMsg);
    this.editorMsg = '';
  }
}
