import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

import {MainTabsPage} from '../../pages/main-tabs/main-tabs'
import {ChatServiceProvider} from '../../providers/chat-service/chat-service';
import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the LoginPage   inputValid() {
    if(this.fake) return true;
    if (this.firstName == null || this.lastName == null ||
      this.birthday == null || this.gender == null ||
      this.phone == null) { return false; }
    return true;

  }
page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-login', templateUrl: 'login.html',})
export class LoginPage
{
  email: string    = null;
  password: string = null;

  constructor(
      public alertCtrl: AlertController,
      public userServiceProvider: UserserviceProvider,
      public chatServiceProvider: ChatServiceProvider,
      public navCtrl: NavController, public navParams: NavParams)
  {
  }

  loginFacebook()
  {
    this.userServiceProvider.loginFacebook(
        res => {
          console.log(res);
          this.updateChat('Facebook');
        },
        err => {
          console.log(err);
          let alert =
              this.alertCtrl.create({title: 'Login failed!', buttons: ['OK']});
          alert.present();
        })
  }

  loginGoogle()
  {
    this.userServiceProvider.loginGoogle(
        res => {
          console.log(res);
          this.updateChat('Google');
          this.navCtrl.push(MainTabsPage)
        },
        err => {
          console.log(err);
          let alert =
              this.alertCtrl.create({title: 'Login failed!', buttons: ['OK']});
          alert.present();
        })
  }

  loginEmail()
  {
    this.userServiceProvider.loginEmail(
        this.email, this.password,
        res => {
          console.log(res);
          this.updateChat('email');
          this.navCtrl.push(MainTabsPage)
        },
        err => {
          console.log(err);
          let alert =
              this.alertCtrl.create({title: 'Login failed!', buttons: ['OK']});
          alert.present();
        })
  }

  loginFake()
  {
    this.userServiceProvider.loginEmail(
        'nanneomom@gmail.com', 'ahya2486',
        res => {
          console.log(res);
          this.updateChat('fake');
          this.navCtrl.push(MainTabsPage)
        },
        err => {
          console.log(err);
          let alert =
              this.alertCtrl.create({title: 'Login failed!', buttons: ['OK']});
          alert.present();
        })
  }

  updateChat(authType: string)
  {
    this.chatServiceProvider.writeChat(
        this.userServiceProvider.getUserId(), 'Logged in at ' + Date() + ", using " + authType + ".");
  }

  logout()
  {
    this.userServiceProvider.logout()
      .then(res => {
        console.log('---log out result---')
        console.log(res)
      })
  }
}
