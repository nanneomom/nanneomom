import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserserviceProvider } from '../../providers/userservice/userservice'
import { AlertController } from 'ionic-angular';
import { WelcomePage } from '../../pages/welcome/welcome'


/**
 * Generated class for the BasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basic',
  templateUrl: 'basic.html',
})
export class BasicPage {
  gender: string = null;
  age: number = null;
  childAge: number = null;

  constructor(public alertCtrl: AlertController, public userServiceProvider: UserserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    let name = this.userServiceProvider.getName();

    let alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Hi ' + name + ", let's begin with some basic information.",
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicPage');
  }

  inputValid() {
    if (this.gender == null || this.childAge == null) { return false; }
    return true;
  }

  doneClicked(event) {
    if (!this.inputValid()) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Some fields are missing, plesae provide all basic information.",
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push(WelcomePage);
    }
  }

}
