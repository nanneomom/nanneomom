import {Component, ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import {UserserviceProvider} from '../../providers/userservice/userservice';


/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage() @Component({selector: 'page-offer', templateUrl: 'offer.html'})

export class OfferPage
{
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;
  isOfferDisabled: boolean    = true;
  isLocationDisabled: boolean = true;

  offering: boolean                = null;
  location: string                 = null;
  addressElement: HTMLInputElement = null;

  map: any               = null;
  places: any            = null;
  autocomplete: any      = null;
  autocompleteItems: any = null;

  markers: any  = null;
  geocoder: any = null;

  constructor(
      public platform: Platform, public navCtrl: NavController,
      public navParams: NavParams,
      public userServiceProvider: UserserviceProvider,
      public geolocation: Geolocation)
  {
    this.places            = new google.maps.places.AutocompleteService();
    this.autocomplete      = {input: ''};
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers  = [];
  }

  ionViewDidLoad()
  {
    this.tryLoadData();
  }

  ionViewDidEnter()
  {
    this.map = new google.maps.Map(
        document.getElementById('map'),
        {center: {lat: -34.9011, lng: -56.1645}, zoom: 15});
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
      }

      this.isOfferDisabled = false;
    }, err => {alert('error loading offer: ' + err)});
  }

  offerChanged()
  {
    /*
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
    */
  }

  updateSearchResults()
  {
    if (this.autocomplete.input == '')
    {
      this.autocompleteItems = [];
      return;
    }
    this.places.getPlacePredictions(
        {input: this.autocomplete.input}, (predictions, status) => {
          console.log('received!!!!');
          console.log(JSON.stringify(predictions));
          this.autocompleteItems = [];
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
  }

  selectSearchResult(item)
  {
    // this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if (status === 'OK' && results[0])
      {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }
}
