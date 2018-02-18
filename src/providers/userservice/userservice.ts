import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserserviceProvider {
  name: any;
  email: any;
  imageUrl: any;
  isLoggedIn: boolean = false;


  constructor(public http: HttpClient, private fireAuth: AngularFireAuth) {
    console.log('Hello UserserviceProvider Provider');
  }


  loginFacebook(success, fail) {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log('---from google---')
        console.log(res.user.displayName)
        this.name = res.user.displayName;
        this.email = res.user.email;
        this.isLoggedIn = true;
        success(res);
      })
      .catch(err => {
        fail(err);
      });
  }

  loginGoogle(success, fail) {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        console.log('---from google---')
        console.log(res.user.displayName)
        this.name = res.user.displayName;
        this.email = res.user.email;
        this.isLoggedIn = true;
        success(res);
      })
      .catch(err => {
        fail(err);
      });
  }

  logout() {
    return this.fireAuth.auth.signOut()
      .then(res => {
        this.name = null;
        this.email = null;
        this.isLoggedIn = false;
      });

  }

  getName() {
    if (this.isLoggedIn) {
      return this.name;
    } else {
      return null;
    }
  }
}
