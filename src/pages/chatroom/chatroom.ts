import {Component, ElementRef, ViewChild} from '@angular/core';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Content, Events} from 'ionic-angular';

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
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  editorMsg: string    = '';
  messages: Array<any> = [];
  db_ref               = null;
  otherUserId          = null;
  otherUserName        = null;

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

    this.userServiceProvider.lookupUserData(
        this.otherUserId, userData => {this.otherUserName = userData.firstName},
        err => {
          alert(err);
        });

    this.db_ref = firebase.database().ref(
        'chatRooms/' + this.chatServiceProvider.getRoomId(this.otherUserId));
    this.db_ref.on('child_added', data => {
      this.messages.push({
        time: data.key,
        name: data.val().name,
        message: data.val().message,
      });
    });
  }


  onFocus()
  {
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom()
  {
    setTimeout(() => {
      if (this.content.scrollToBottom)
      {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  sendMsg()
  {
    console.log('sending: ' + this.editorMsg);
    this.chatServiceProvider.writeChat(this.otherUserId, this.editorMsg);
    this.editorMsg = '';
  }
}
