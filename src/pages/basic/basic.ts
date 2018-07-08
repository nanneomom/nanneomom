import {Component} from '@angular/core';
import {NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';

import {SelectAddressPage} from '../../pages/select-address/select-address'
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
  firstName: string    = null;
  lastName: string     = null;
  kid_birthday: string = null;
  mom_birthday: string = null;
  gender: string       = null;
  phone: string        = null;
  address: string      = null;
  location             = null;
  fake                 = true;

  constructor(
      public modalCtrl: ModalController, public alertCtrl: AlertController,
      public userServiceProvider: UserserviceProvider,
      public nativeGeocoder: NativeGeocoder, public navCtrl: NavController,
      public navParams: NavParams)
  {
  }

  ionViewWillLeave()
  {
    // update db
    this.userServiceProvider.updateUserInfo(
        this.firstName, this.lastName, this.mom_birthday, this.kid_birthday,
        this.gender, this.phone, this.address, this.location,
        () => {
          console.log('User info updated.');
        },
        (err) => {
          console.log('Failed to update user info: ' + err);
        });
  }

  ionViewDidLoad()
  {
    this.userServiceProvider.loadUserData(
        () => {
          this.firstName    = this.userServiceProvider.getFirstName();
          this.lastName     = this.userServiceProvider.getLastName();
          this.mom_birthday = this.userServiceProvider.getBirthday();
          this.kid_birthday = this.userServiceProvider.getKidBirthday();
          this.gender       = this.userServiceProvider.getGender();
          this.phone        = this.userServiceProvider.getPhone();
          this.address      = this.userServiceProvider.getAddress();
          this.location     = this.userServiceProvider.getLocation();
        },
        (err) => {
          console.error('Failed to load user data: ' + err);
        });
  }

  selectAddress(event)
  {
    console.log(event);
    this.presentAddressPage();
  }

  presentAddressPage()
  {
    const modal = this.modalCtrl.create(SelectAddressPage);
    modal.onDidDismiss(data => {
      if (data != null)
      {
        this.address  = data.address;
        this.location = data.location;
        console.log('model data: ' + JSON.stringify(data));
      }
    });

    modal.present();
  }
}
