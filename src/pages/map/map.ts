import {Component} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
/*
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
*/

// import { GoogleMaps } from "@ionic-native/google-maps";
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
  /*
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  */

  map: GoogleMap;

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams)
  {
    platform.ready().then(() => {
      //this.initMap();
      this.loadMap();
    });
  }

  ionViewDidLoad()
  {
    /*
    this.loadMap();
    this.platform.ready().then(() => {
      this.loadMap();
    });
    */
  }

  ngAfterViewInit()
  {
    /*
    console.log('kirak 1');
    this.platform.ready().then(() => {
      console.log('kirak 2');
      this.loadMap();
    });
    */
  }

  /*
  initMap()
  {
    console.log('kirak 1');
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      // center: {lat: 41.85, lng: -87.65},
      camera: {target: {lat: 43.0741904, lng: -89.3809802}, zoom: 18, tilt: 30},
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
    });
  }
  */

  loadMap()
  {
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
