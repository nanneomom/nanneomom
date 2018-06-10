import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage
{
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;

  map: any               = null;
  places: any            = null;
  autocomplete: any      = null;
  autocompleteItems: any = null;
  markers: any           = null;
  geocoder: any          = null;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController)
  {
    this.places            = new google.maps.places.AutocompleteService();
    this.autocomplete      = {input: ''};
    this.autocompleteItems = [];
    this.markers           = [];
    this.geocoder          = new google.maps.Geocoder;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SelectAddressPage');
  }

  ionViewDidEnter()
  {
    this.map = new google.maps.Map(
        document.getElementById('map'),
        {center: {lat: -34.9011, lng: -56.1645}, zoom: 15});
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
        this.viewCtrl.dismiss({'address': results[0].formatted_address});

        // this.autocomplete.input = results[0].formatted_address;
        // TODO: map
        /*
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
        */
      }
    })
  }


  dismiss()
  {
    this.viewCtrl.dismiss();
  }
}
