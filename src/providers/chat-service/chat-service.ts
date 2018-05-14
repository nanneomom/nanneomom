import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

import {UserserviceProvider} from '../../providers/userservice/userservice'

export class ChatUserInfo
{
  id: string;
  name: string;
}

@Injectable()
export class ChatServiceProvider
{
  constructor(
      public http: HttpClient, private fireAuth: AngularFireAuth,
      public userServiceProvider: UserserviceProvider)
  {
    console.log('Hello ChatServiceProvider Provider');
  }

  getRoomId(otherUid: string)
  {
    var myUid  = this.userServiceProvider.getUserId();
    var roomId = null;
    if (myUid > otherUid)
    {
      roomId = myUid + '_to_' + otherUid;
    }
    else
    {
      roomId = otherUid + '_to_' + myUid;
    }
    return roomId;
  }

  updateChatRoom(otherUid: string)
  {
    var roomId = this.getRoomId(otherUid);
    var lastUpdated = Date.now().toString();
    // Update my chat room info.
    firebase.database()
        .ref(
            'chatUsers/' + this.userServiceProvider.getUserId() + '/' +
            otherUid)
        .set({
          room_id: roomId,
          other_user_id: otherUid,
          last_updated: lastUpdated,
        })
        .then(res => {
          console.log('=== updated chat room');
        })
        .catch(err => {
          alert('!!! Failed to update chat room');
        });

    // Update other's chat room info.
    firebase.database()
        .ref(
            'chatUsers/' + otherUid + '/' +
            this.userServiceProvider.getUserId())
        .set({
          room_id: roomId,
          other_user_id: this.userServiceProvider.getUserId(),
          last_updated: lastUpdated,
        })
        .then(res => {
          console.log('=== updated chat room');
        })
        .catch(err => {
          alert('!!! Failed to update chat room');
        });
  }

  writeChat(otherUserId, message)
  {
    var roomId = this.getRoomId(otherUserId);
    firebase.database()
        .ref('chatRooms/' + roomId + '/' + Date.now())
        .set({
          user: this.userServiceProvider.getUserId(),
          name: this.userServiceProvider.getFirstName(),
          message: message,
        })
        .then(res => {
          console.log('=== chat written');
          this.updateChatRoom(otherUserId);
        })
        .catch(err => {
          console.error('!!! Failed to write chat');
        });
  }
}
