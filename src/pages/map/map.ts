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

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams, public geolocation: Geolocation)
  {
  }

  ionViewDidLoad()
  {
    this.platform.ready().then(() => {
      this.loadMap();
      console.log('hello');
    });
  }

  loadMap()
  {
    this.geolocation.getCurrentPosition({ timeout: 30000 }).then(
        (position) => {
          console.log('hello location');
          let loc = new google.maps.LatLng(
              position.coords.latitude, position.coords.longitude);
          console.log('current location: ' + loc);
        },
        (err) => {
          console.log('failed location');
          console.log(err);
        });

    let mapOptions: GoogleMapOptions = {
      camera:
          {target: {lat: 43.0741904, lng: -89.3809802}, zoom: 18, tilt: 30}
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

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
    });
  }
}
