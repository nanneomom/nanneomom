import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

export class ChatUserInfo {
  id: string;
  name: string;
}

@Injectable()
export class ChatServiceProvider
{
  constructor(public http: HttpClient, private fireAuth: AngularFireAuth)
  {
    console.log('Hello ChatServiceProvider Provider');
  }

  updateSelfChat(uid, userName)
  {
    var roomId = uid + '_to_' + uid;
    var otherUserId = uid;
    firebase.database()
        .ref('chatUsers/' + uid + '/' + otherUserId)
        .set({
          room_id: roomId,
          other_user_name: userName,
          other_user_id: otherUserId,
          last_updated: Date.now().toString(),
        })
        .then(res => {
          console.log('=== updated self chat');
        })
        .catch(err => {
          console.error('!!! Failed to init self chat');
        });

    this.writeChat(roomId, uid, userName, "hello, updated at " + Date());
  }

  writeChat(roomId, userId, userName, message)
  {
    firebase.database()
        .ref('chatRooms/' + roomId + '/' + Date.now())
        .set({
          user: userId,
          name: userName,
          message: message,
        })
        .then(res => {
          console.log('=== chat written');
        })
        .catch(err => {
          console.error('!!! Failed to write chat');
        });
  }

}
