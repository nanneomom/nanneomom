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
  // Info from auth services (e.g., google or facebook).
  uid: string   = null;
  email: string = null;
  imageUrl: string;

  // Info from users.
  firstName: string = null;
  lastName: string  = null;
  birthday: string  = null;
  gender: string    = null;
  phone: string     = null;

  isLoggedIn: boolean = false;
  fake                = false;

  constructor(public http: HttpClient, private fireAuth: AngularFireAuth)
  {
    console.log('Hello UserserviceProvider Provider');
  }

  needMoreInfo()
  {
    return !(
        this.firstName != null && this.firstName != '' &&
        this.lastName != null && this.lastName != '' && this.phone != null &&
        this.phone != '');
  }

  updateUserLoginInfo(uid, email, success, fail)
  {
    this.writeUserAccount(uid, email)
        .then(res => {
          this.uid        = uid;
          this.email      = email;
          this.isLoggedIn = true;
          console.log('=== Wrote user account');
          console.log('uid=' + uid);
          console.log('email=' + email);
          success();
        })
        .catch(err => {
          console.log('!!! Failed to write user account');
          fail(err);
        });
  }

  updateUserInfo(firstName, lastName, birthday, gender, phone, success, fail)
  {
    if (this.uid == null || this.uid == '')
    {
      fail('UID is invalid')
      return;
    }

    if (!this.fake &&
        (firstName == null || lastName == null || birthday == null ||
         gender == null || phone == null))
    {
      fail('Invalid user info.');
      return;
    }

    this.writeUserData(this.uid, firstName, lastName, birthday, gender, phone)
        .then(res => {
          console.log('=== Wrote user data');
          this.firstName = firstName;
          this.lastName  = lastName;
          this.birthday  = birthday;
          this.gender    = gender;
          this.phone     = phone;
          success();
        })
        .catch(err => {
          console.log('!!! Failed to write user account');
          fail(err);
        });
  }

  writeUserAccount(uid, email)
  {
    return firebase.database().ref('users/').child(uid).set({email: email});
  }

  writeUserData(uid, firstName, lastName, birthday, gender, phone)
  {
    return firebase.database().ref('userData/' + uid).set({
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
      phone: phone
    });
  }

  getFirstName()
  {
    return this.firstName;
  }
  getLastName()
  {
    return this.lastName;
  }
  getBirthday()
  {
    return this.birthday;
  }
  getGender()
  {
    return this.gender;
  }
  getPhone()
  {
    return this.phone;
  }

  loginFacebook(success, fail)
  {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log('---from google---');
          console.log(res);
          // TODO: use res.user.displayName
          this.updateUserLoginInfo(
              res.user.uid, res.user.email,
              () => {
                success(res);
              },
              (err) => {
                fail(err);
              });
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
          this.updateUserLoginInfo(
              res.user.uid, res.user.email,
              () => {
                success(res);
              },
              (err) => {
                fail(err);
              });
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
          this.updateUserLoginInfo(
              res.uid, res.email,
              () => {
                success(res);
              },
              (err) => {
                fail(err);
              });
        })
        .catch(err => {
          fail(err);
        });
  }

  signupUser(email: string, password: string): Promise<any>
  {
    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser => {
          firebase.database().ref('/userProfile').child(newUser.uid).set({
            email: email
          });
        });
  }

  resetPassword(email: string): Promise<void>
  {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout()
  {
    return this.fireAuth.auth.signOut().then(res => {
      this.uid        = null;
      this.email      = null;
      this.firstName  = null;
      this.lastName   = null;
      this.birthday   = null;
      this.gender     = null;
      this.phone      = null;
      this.isLoggedIn = false;
    });
  }
}
