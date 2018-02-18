import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice'
import { AlertController } from 'ionic-angular';
import { MapPage } from '../../pages/map/map'


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(
    public alertCtrl: AlertController,
    public userServiceProvider: UserserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  beginClicked(event) {
    let name = this.userServiceProvider.getName();
    let alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Hi ' + name + ", the next function is still in progress.",
      buttons: ['OK']
    });
    //alert.present();

    this.navCtrl.push(MapPage);
  }
}
