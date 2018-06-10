import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {UserserviceProvider} from '../../providers/userservice/userservice';

/**
 * Generated class for the OfferNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-new',
  templateUrl: 'offer-new.html',
})
export class OfferNewPage
{
  isOfferDisabled: boolean    = true;
  isLocationDisabled: boolean = true;

  // ui var
  offering: boolean = null;
  location: string  = null;
  address           = 'N/A';

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad OfferNewPage');
    this.tryLoadData();
  }

  tryLoadData()
  {
    this.userServiceProvider.getOffering(result => {
      if (result == null)
      {
        this.offering           = false;
        this.isLocationDisabled = false;
      }
      else
      {
        this.offering           = true;
        this.location           = result.location;
        this.isLocationDisabled = true;
        this.isOfferDisabled    = false;
      }
    }, err => {alert('error loading offer: ' + err)});
  }

  offerChanged()
  {
    if (this.offering)
    {
      this.userServiceProvider.setOffering(this.location)
          .then(res => {
            this.isLocationDisabled = true;
            console.log('!!! Posted offer: location=' + this.location);
          })
          .catch(err => {
            console.error('error posting an offer: ' + err);
            this.offering = false;
          });
    }
    else
    {
      this.userServiceProvider.resetOffering()
          .then(res => {
            this.isLocationDisabled = false;
            console.log('!!! Removed offer');
          })
          .catch(err => {
            console.error('error removing an offer: ' + err);
            this.offering = true;
          });
    }
  }

  locationChanged()
  {
    this.isOfferDisabled = false;
    console.log(this.location);
  }
}
