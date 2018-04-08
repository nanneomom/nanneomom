import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
    @IonicPage() @Component({selector: 'page-offer', templateUrl: 'offer.html',})
export class OfferPage
{
  offering: boolean = false;
  location: string  = 'home';

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public geolocation: Geolocation)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad OfferPage');
    this.userServiceProvider.getOffering(
        result => {
          if (result == null)
          {
            this.offering = false;
          }
          else
          {
            this.offering = true;
            this.location = result.location;
          }
        },
        err => {
          console.log('offer error: ' + err);
        });
  }

  offerChanged()
  {
    var options = {enableHighAccuracy: false, timeout: 5000, maximumAge: 0};
    this.geolocation.getCurrentPosition(options).then(
        (position) => {
          this.userServiceProvider
              .setOffering(
                  this.offering, this.location, position.coords.latitude,
                  position.coords.longitude)
              .then(res => {
                console.log('!!! Posted offer');
              })
              .catch(err => {
                console.error('error posting an offer: ' + err);
              });
        },
        (err) => {
          alert('Error getting location: ' + err.message);
        });
  }
}
