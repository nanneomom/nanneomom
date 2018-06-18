import {Component} from '@angular/core';
// import {ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMap, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';
import firebase from 'firebase';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import {ChatroomPage} from '../../pages/chatroom/chatroom';
import {UserserviceProvider} from '../../providers/userservice/userservice';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  markers                 = new Map();

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

  ionViewDidLeave()
  {
    console.log('leave');
    this.removeAllMarkers();
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

    // Use LA by default.
    var lat = 34.0522;
    var lng = -118.2437;
    this.moveCamera(lat, lng);
    /*
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
      */
  }

  moveCamera(lat, lng)
  {
    var loc = {'lat': lat, 'lng': lng};

    console.log('moving camera: lat=' + lat + 'lng=' + lng);
    this.map.animateCamera({
      'target': loc,
      'zoom': 8,
      'duration': 1000
      //'tilt': 60,
      //'bearing': 140,
    });
    this.addMarkers();
  }

  hasMarkerInformation(value)
  {
    return (
        value.hasOwnProperty('firstName') && value.hasOwnProperty('lat') &&
        value.hasOwnProperty('lng') && value.hasOwnProperty('offer_location'));
  }

  tryAddMarker(key, value)
  {
    if (this.hasMarkerInformation(value))
    {
      console.log('adding marker: ' + JSON.stringify(value));
      var offer_location = null;
      if (value.offer_location == 'mine')
      {
        offer_location = 'Home';
      }
      else if (value.offer_location == 'yours')
      {
        offer_location = 'Remote Home';
      }
      else
      {
        offer_location = 'Playground';
      }

      var title = 'Name: ' + value.firstName + ' ' + value.lastName + '\n';
      title += 'Type: ' + offer_location;
      this.map
          .addMarker({
            title: title,
            icon: 'blue',
            animation: 'DROP',
            position: {lat: value.lat, lng: value.lng}
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
              this.navCtrl.push(ChatroomPage, {otherUserId: key});
            });
            this.markers.set(key, marker);
          });
    }
    else
    {
      console.log(
          'ERROR, not enough info for marker: ' + JSON.stringify(value));
    }
  }

  removeAllMarkers()
  {
    this.markers.forEach((value, key, map) => {
      console.log(`removing marker key: $(key)`);
      value.remove();
    });
    this.markers.clear();
  }

  tryRemoveMarker(key)
  {
    if (this.markers.has(key))
    {
      this.markers.get(key).remove();
      this.markers.delete(key);
    }
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

    var ref = firebase.database().ref('offers/');
    ref.on('child_added', (data) => {
      var key   = data.key;
      var value = data.val();

      if (this.markers.has(key))
      {
        console.log('ERROR!!!! marker exists already.');
        this.markers.get(key).remove();
        this.markers.delete(key);
      }

      this.tryAddMarker(key, value);
    });

    ref.on('child_changed', (data) => {
      this.tryRemoveMarker(data.key);
      this.tryAddMarker(data.key, data.val());
    });

    ref.on('child_removed', (data) => {
      this.tryRemoveMarker(data.key);
    });
  }
}
