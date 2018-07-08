import {Component} from '@angular/core';
import firebase from 'firebase';
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

  lat: number = null;
  lng: number = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad OfferNewPage');
    // this.initPlaygrounds();
    this.available_playgrounds = [
      {
        id: '0',
        name: 'Garcia, Mary Louise Family Day Care',
        address: '501 N. Orchard Burbank, CA 91505',
        lat: 34.1726783,
        lng: -118.32703609999999,
      },
      {
        id: '1',
        name: 'Mary Alice O\'Connor Family Center',
        address: '401 N Buena Vista St Burbank, CA 91505',
        lat: 34.165324999999996,
        lng: -118.331995,
      },
      {
        id: '2',
        name: 'La Canada United Methodist Children’s Center',
        address: '104 Berkshire Pl La Canada Flintridge, CA 91011',
        lat: 34.188841999999994,
        lng: -118.17954400000002,
      },
    ];

    this.tryLoadData();
  }

  initPlaygrounds()
  {
    var ref = firebase.database().ref('playGrounds/');
    ref.on('child_added', (data) => {
      console.log('READ KEY: ' + data.key);
      console.log('READ VAL: ' + JSON.stringify(data));
      var key   = data.key;
      var value = data.val();
      // this.tryAddMarker(key, value);
    });

    ref.on(
        'child_changed',
        (data) => {
            // this.tryRemoveMarker(data.key);
            // this.tryAddMarker(data.key, data.val());
        });

    ref.on(
        'child_removed',
        (data) => {
            // this.tryRemoveMarker(data.key);
        });
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
        this.offering = true;
        console.log(' ===== read result ==== ');
        console.log(JSON.stringify(result));
        console.log(' ===== read done ==== ');

        // Update current location data from the loaded data.
        this.location = result.offer_location;
        if (this.location == 'indoor')
        {
          for (let i = 0; i < this.available_playgrounds.length; i++)
          {
            let pg = this.available_playgrounds[i];
            if (pg.id == result.play_ground.id)
            {
              this.selected_playground = pg;
              break;
            }
          }
        }
        this.locationChanged();

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
          .setOffering(
              this.location, this.address, this.lat, this.lng,
              this.selected_playground)
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
      this.lat                 = this.userServiceProvider.getLocation().lat;
      this.lng                 = this.userServiceProvider.getLocation().lng;
    }
    else if (this.location == 'yours')
    {
      this.address             = '';
      this.selected_playground = null;
      this.isOfferDisabled     = false;
      // TODO: Set to the current phone location.
      this.lat = 0;
      this.lng = 0;
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
    this.lat             = this.selected_playground.lat;
    this.lng             = this.selected_playground.lng;
  }
}
