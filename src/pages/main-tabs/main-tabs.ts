import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicPage } from '../../pages/basic/basic'
import { MapPage } from '../../pages/map/map'

/**
 * Generated class for the MainTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html',
})
export class MainTabsPage {
  basicPage = BasicPage;
  mapPage = MapPage;

  /*
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTabsPage');
  }
  */

}
