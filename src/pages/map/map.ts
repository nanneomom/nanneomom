import {Component} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';

import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';


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

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams, public geolocation: Geolocation)
  {
  }

  ionViewDidLoad()
  {
    this.platform.ready().then(() => {
      this.map = GoogleMaps.create('map_canvas');
    });
  }

  ionViewDidEnter()
  {
    this.getLocation(
        position => {
          console.log('lat: ' + position.coords.latitude);
          console.log('lng: ' + position.coords.longitude);
          this.tryMoveCamera(
              position.coords.latitude, position.coords.longitude);
        },
        err => {
          console.log('error updating location!!!: ');
        });
  }


  getLocation(success, fail)
  {
    var options = {enableHighAccuracy: false, timeout: 5000, maximumAge: 0};
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition(options).then(
          (position) => {
            success(position);
          },
          (err) => {
            alert('Error getting location: ' + err.message);
          });
    });
  }

  tryMoveCamera(lat, lng)
  {
    if (this.mapInitialized)
    {
      this.moveCamera(lat, lng)
    }
    else
    {
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.mapInitialized = true;
        this.moveCamera(lat, lng);
      });
    }
  }

  moveCamera(lat, lng)
  {
    var loc = {'lat': lat, 'lng': lng};

    console.log('moving camera!');
    this.map.animateCamera({
      'target': loc,
      'tilt': 60,
      'zoom': 10,
      'bearing': 140,
      'duration': 1000  // = 5 sec.
    });

    /*
    // Now you can use all methods safely.
    this.map
        .addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {lat: 43.0741904, lng: -89.3809802}
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
          });
        });
        */
  }
}
