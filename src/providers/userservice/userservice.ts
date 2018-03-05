import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';


/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserserviceProvider
{
  uid: any;
  name: any;
  email: any;
  imageUrl: any;
  isLoggedIn: boolean = false;


  constructor(public http: HttpClient, private fireAuth: AngularFireAuth)
  {
    console.log('Hello UserserviceProvider Provider');
  }

  updateUser(uid, name, email)
  {
    this.uid        = uid;
    this.name       = name;
    this.email      = email;
    this.isLoggedIn = true;
    console.log('---user info updated---');
    console.log('uid=' + uid);
    console.log('name=' + name);
    console.log('email=' + email);
  }


  loginFacebook(success, fail)
  {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log('---from google---');
          console.log(res);
          this.updateUser(res.user.uid, res.user.displayName, res.user.email);
          success(res);
        })
        .catch(err => {
          fail(err);
        });
  }

  loginGoogle(success, fail)
  {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log('---from google---');
          console.log(res);
          this.updateUser(res.user.uid, res.user.displayName, res.user.email);
          success(res);
        })
        .catch(err => {
          fail(err);
        });
  }

  loginEmail(success, fail)
  {
    var email  = 'nanneomom@gmail.com';
    var passwd = 'ahya2486';
    this.fireAuth.auth.signInWithEmailAndPassword(email, passwd)
        .then(res => {
          console.log('---from email---');
          console.log(res);
          this.updateUser(res.uid, "", res.email);
          success(res);
        })
        .catch(err => {
          fail(err);
        });
  }

  logout()
  {
    return this.fireAuth.auth.signOut().then(res => {
      this.name       = null;
      this.email      = null;
      this.isLoggedIn = false;
    });
  }

  getName()
  {
    if (this.isLoggedIn)
    {
      return this.name;
    }
    else
    {
      return null;
    }
  }
}
