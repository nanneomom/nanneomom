import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicPage } from '../../pages/basic/basic'
import { MapPage } from '../../pages/map/map'
import { OfferPage } from '../../pages/offer/offer'
import { SearchPage } from '../../pages/search/search'
import { ChatPage } from '../../pages/chat/chat'

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
  offerPage = OfferPage;
  searchPage = SearchPage;
  chatPage = ChatPage;
}
