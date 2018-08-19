import {HttpClientModule} from '@angular/common/http'
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Firebase} from '@ionic-native/firebase';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import firebase from 'firebase';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {GooglePlacesAutocompleteComponentModule} from 'ionic2-google-places-autocomplete';

import {BasicPage} from '../pages/basic/basic';
import {ChatPage} from '../pages/chat/chat';
import {ChatroomPage} from '../pages/chatroom/chatroom';
import {DetailPage} from '../pages/detail/detail';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {MapPage} from '../pages/map/map';
import {OfferNewPage} from '../pages/offer-new/offer-new';
import {OfferPage} from '../pages/offer/offer';
import {SearchPage} from '../pages/search/search';
import {SelectAddressPage} from '../pages/select-address/select-address';
import {WelcomePage} from '../pages/welcome/welcome';
import {ChatServiceProvider} from '../providers/chat-service/chat-service';
import {FcmProvider} from '../providers/fcm/fcm';
import {UserserviceProvider} from '../providers/userservice/userservice';

import {MyApp} from './app.component';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDZCBSF7NiztK4_uy4nHjLq1ljhrbb8WYM',
    authDomain: 'nanneo-1518386194514.firebaseapp.com',
    databaseURL: 'https://nanneo-1518386194514.firebaseio.com',
    projectId: 'nanneo-1518386194514',
    storageBucket: 'nanneo-1518386194514.appspot.com',
    messagingSenderId: '124360184526'
  }
};

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BasicPage,
    DetailPage,
    WelcomePage,
    MapPage,
    OfferPage,
    OfferNewPage,
    SearchPage,
    SelectAddressPage,
    ChatPage,
    ChatroomPage,
    MainTabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,  // imports firebase/auth, only needed for auth
                            // features,
    HttpClientModule,
    GooglePlacesAutocompleteComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DetailPage,
    BasicPage,
    WelcomePage,
    MapPage,
    OfferPage,
    OfferNewPage,
    SearchPage,
    SelectAddressPage,
    ChatPage,
    MainTabsPage,
    ChatPage,
    ChatroomPage,
  ],
  providers: [
    Firebase,
    StatusBar,
    NativeGeocoder,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserserviceProvider,
    ChatServiceProvider,
    FcmProvider,
  ]
})
export class AppModule
{
}
