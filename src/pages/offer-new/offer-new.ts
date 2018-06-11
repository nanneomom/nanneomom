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

  available_playgrounds = [];

  // ui var
  offering: boolean   = null;
  location: string    = null;
  address: string     = '';
  selected_playground = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad OfferNewPage');
    this.tryLoadData();
    this.available_playgrounds = [
      {
        name: 'Garcia, Mary Louise Family Day Care',
        address: '501 N. Orchard Burbank, CA 91505',
      },
      {
        name: 'Mary Alice O\'Connor Family Center',
        address: '401 N Buena Vista St Burbank, CA 91505',
      },
      {
        name: 'La Canada United Methodist Children’s Center',
        address: '104 Berkshire Pl La Canada Flintridge, CA 91011',
      },
    ];
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
      this.userServiceProvider
          .setOffering(this.location, this.address, this.selected_playground)
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
            this.location            = null;
            this.address             = '';
            this.selected_playground = null;
            this.isLocationDisabled  = false;
            this.isOfferDisabled     = true;
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
    console.log(this.location);
    if (this.location == 'mine')
    {
      this.address             = this.userServiceProvider.getAddress();
      this.selected_playground = null;
      this.isOfferDisabled     = false;
    }
    else if (this.location == 'yours')
    {
      this.address             = '';
      this.selected_playground = null;
      this.isOfferDisabled     = false;
    }
    else if (this.location == 'indoor')
    {
      if (this.selected_playground == null)
      {
        this.address = '';
      }
      else
      {
        this.address = this.selected_playground.address;
      }
    }
  }

  playgroundChanged()
  {
    this.isOfferDisabled = false;
    this.address         = this.selected_playground.address;
  }
}
