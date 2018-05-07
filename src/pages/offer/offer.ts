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

  offering: boolean = false;
  location: string  = 'home';

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
        this.mapInitialized = true;

        this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((camera) => {
          var lat = camera[0].target.lat;
          var lng = camera[0].target.lng;
          console.log('current loc: lat=' + lat + ', lng=' + lng);
        });


        /*
        var options = {enableHighAccuracy: false, timeout: 3000, maximumAge: 0};
        this.geolocation.getCurrentPosition(options).then(
            (position) => {
              var latlng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              this.map.setCameraTarget(latlng);
            },
            (err) => {
              console.log('Error getting location: ' + err.message);
            });
            */
      });
    });
  }

  tryMoveCamera(lat, lng)
  {
    if (this.mapInitialized)
    {
      var latlng = {lat: lat, lng: lng};
      this.map.animateCamera({'target': latlng, 'zoom': 8, 'duration': 1000});
    }
  }

  ionViewDidEnter()
  {
    console.log('ionViewDidEnter OfferPage');

    this.userServiceProvider.getOffering(
        result => {
          if (result == null)
          {
            this.offering = false;
            // TODO: Use user location rather than LA.
            var lat = 34.0522;
            var lng = -118.2437;
            this.tryMoveCamera(lat, lng);
          }
          else
          {
            this.offering = true;
            this.location = result.location;
            this.tryMoveCamera(result.lat, result.lng);
          }
        },
        err => {
          alert('error loading offer: '  + err)
        });
  }

  offerChanged()
  {
    if (!this.mapInitialized) {
      alert('Error: map not initialized!!');
    }

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
