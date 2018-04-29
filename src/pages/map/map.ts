import {Component} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';

import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {UserserviceProvider} from '../../providers/userservice/userservice'


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps],
})


export class MapPage
{
  map: GoogleMap;
  mapInitialized: boolean = false;
  db_ref                  = null;

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams, public geolocation: Geolocation,
      public userServiceProvider: UserserviceProvider)
  {
  }

  ionViewDidLoad()
  {
    this.platform.ready().then(() => {
      this.map = GoogleMaps.create('map_canvas');
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('map ready!!!');
        this.mapInitialized = true;
        this.tryMoveCamera();
      });
    });
  }

  ionViewDidEnter()
  {
    if (!this.mapInitialized)
      return;
    this.tryMoveCamera();
  }

  getLocation(success, fail)
  {
    var options = {enableHighAccuracy: false, timeout: 5000, maximumAge: 0};
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition(options).then(
          (position) => {
            success(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            fail(err);
          });
    });
  }

  tryMoveCamera()
  {
    if (!this.mapInitialized)
      return;

    this.getLocation(
        (lat, lng) => {
          console.log('lat: ' + lat);
          console.log('lng: ' + lng);
          this.moveCamera(lat, lng);
        },
        err => {
          console.log('error updating location!!!: ' + err.message);
          // Use LA by default.
          var lat = 34.0522;
          var lng = -118.2437;
          this.moveCamera(lat, lng);
        });
  }

  moveCamera(lat, lng)
  {
    var loc = {'lat': lat, 'lng': lng};

    console.log('moving camera: lat=' + lat + 'lng=' + lng);
    this.map.animateCamera({
      'target': loc,
      'tilt': 60,
      'zoom': 8,
      'bearing': 140,
      'duration': 1000
    });
    this.addMarkers();
  }

  addMarkers()
  {
    if (this.db_ref)
    {
      // Register handler only once.
      return;
    }
    if (!this.mapInitialized)
    {
      // Do this only if map was initialized.
      return;
    }

    this.db_ref = this.userServiceProvider.onOfferChanged((key, value) => {
      console.log('value: ' + JSON.stringify(value));
      if (value.hasOwnProperty('firstName') && value.hasOwnProperty('lat') &&
          value.hasOwnProperty('lng') && value.hasOwnProperty('location'))
      {
        this.map
            .addMarker({
              title: value.firstName,
              icon: 'blue',
              animation: 'DROP',
              position: {lat: value.lat, lng: value.lng}
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                alert('Location: ' + value.location);
              });
            });
      }
    });
  }
}
