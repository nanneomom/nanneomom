import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMap, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import {UserserviceProvider} from '../../providers/userservice/userservice'

    /**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage() @Component({selector: 'page-offer', templateUrl: 'offer.html', providers: [GoogleMaps],})



export class OfferPage
{
  map: GoogleMap;
  mapInitialized: boolean = false;

  isOfferDisabled: boolean = true;
  isLocationDisabled: boolean = true;

  offering: boolean = null;
  location: string  = null;
  lat: number       = null;
  lng: number       = null;

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public geolocation: Geolocation)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad OfferPage');
    this.platform.ready().then(() => {
      this.map = GoogleMaps.create('map_canvas');
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('map ready!!!');
        this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((camera) => {
          var lat = camera[0].target.lat;
          var lng = camera[0].target.lng;
          console.log('current loc: lat=' + lat + ', lng=' + lng);
        });
        this.mapInitialized = true;
        this.tryLoadData();
      });
    });
  }

  ionViewDidEnter()
  {
  }

  tryLoadData()
  {
    this.userServiceProvider.getOffering(result => {
      if (result == null)
      {
        this.offering = false;
        // TODO: Use user location rather than LA.
        this.lat = 34.0522;
        this.lng = -118.2437;
      }
      else
      {
        this.offering = true;
        this.location = result.location;
        this.lat      = result.lat;
        this.lng      = result.lng;
      }
      this.tryMoveCamera(this.lat, this.lng);
    }, err => {alert('error loading offer: ' + err)});
  }

  tryMoveCamera(lat, lng)
  {
    var latlng = {lat: lat, lng: lng};
    this.map.animateCamera({'target': latlng, 'zoom': 8, 'duration': 1000});
    this.isOfferDisabled = false;
    this.isLocationDisabled = false;
  }

  offerChanged()
  {
    var target = this.map.getCameraTarget();
    console.log('offer location: ' + target.lat + ', ' + target.lng);

    if (this.offering)
    {
      var loc = this.map.getCameraTarget();
      this.userServiceProvider.setOffering(this.location, loc.lat, loc.lng)
          .then(res => {
            console.log(
                '!!! Posted offer: location=' + this.location +
                ', lat=' + loc.lat + ', lng=' + loc.lng);
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
            console.log('!!! Removed offer');
          })
          .catch(err => {
            console.error('error removing an offer: ' + err);
            this.offering = true;
          });
    }
  }
}
