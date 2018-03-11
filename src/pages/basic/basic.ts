import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

import {WelcomePage} from '../../pages/welcome/welcome'
import {UserserviceProvider} from '../../providers/userservice/userservice'


    /**
 * Generated class for the BasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-basic', templateUrl: 'basic.html',})
export class BasicPage
{
  firstName: string = null;
  lastName: string  = null;
  birthday: string  = null;
  gender: string    = null;
  phone: string     = null;
  fake              = true;

  constructor(
      public alertCtrl: AlertController,
      public userServiceProvider: UserserviceProvider,
      public navCtrl: NavController, public navParams: NavParams)
  {
    /*
    let name = this.userServiceProvider.getFirstName();
    let alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Hi ' + name + ", let's begin with some basic information.",
      buttons: ['OK']
    });
    alert.present();
    */
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad BasicPage');
    this.firstName = this.userServiceProvider.getFirstName();
    this.lastName  = this.userServiceProvider.getLastName();
    this.birthday  = this.userServiceProvider.getBirthday();
    this.gender    = this.userServiceProvider.getGender();
    this.phone     = this.userServiceProvider.getPhone();
  }

  doneClicked(event)
  {
    this.userServiceProvider.updateUserInfo(
        this.firstName, this.lastName, this.birthday, this.gender, this.phone,
        () => {
          this.navCtrl.push(WelcomePage);
        },
        (err) => {
          let alert = this.alertCtrl.create(
              {title: 'Error', subTitle: err, buttons: ['OK']});
          alert.present();
        });
  }
}
