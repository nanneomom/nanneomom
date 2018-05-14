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
  otherUserId          = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public chatServiceProvider: ChatServiceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ChatroomPage');
    this.otherUserId = this.navParams.get('otherUserId');
    console.log('talking with uid=' + this.otherUserId);

    this.db_ref = firebase.database().ref(
        'chatRooms/' + this.chatServiceProvider.getRoomId(this.otherUserId));
    this.db_ref.on('child_added', data => {
      this.messages.push(data.val());
    });
  }

  sendMsg()
  {
    console.log('sending: ' + this.editorMsg);
    this.chatServiceProvider.writeChat(this.otherUserId, this.editorMsg);
    this.editorMsg = '';
  }
}
