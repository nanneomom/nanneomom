import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {BasicPage} from '../../pages/basic/basic';
import {ChatPage} from '../../pages/chat/chat';
import {MapPage} from '../../pages/map/map';
import {OfferNewPage} from '../../pages/offer-new/offer-new';
import {OfferPage} from '../../pages/offer/offer';
import {SearchPage} from '../../pages/search/search';

@IonicPage()
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html',
})
export class MainTabsPage
{
  basicPage    = BasicPage;
  mapPage      = MapPage;
  offerPage    = OfferPage;
  newOfferPage = OfferNewPage;
  searchPage   = SearchPage;
  chatPage     = ChatPage;
}
