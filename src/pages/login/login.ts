import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserserviceProvider } from '../../providers/userservice/userservice'
import { BasicPage } from '../../pages/basic/basic'
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public alertCtrl: AlertController,
    public userServiceProvider: UserserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook() {
    this.userServiceProvider.loginFacebook(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: 'Login failed!',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  loginGoogle() {
    this.navCtrl.push(BasicPage);
    /*

    this.userServiceProvider.loginGoogle(
      res => {
        console.log(res);
        this.navCtrl.push(BasicPage)
      },
      err => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: 'Login failed!',
          buttons: ['OK']
        });
        alert.present();
      }
    )
    */
  }

  logout() {
    this.userServiceProvider.logout()
      .then(res => {
        console.log('---log out result---')
        console.log(res)
      })
  }

}
