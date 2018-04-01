import {HttpClientModule} from '@angular/common/http'
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Geolocation} from '@ionic-native/geolocation';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import firebase from 'firebase';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {BasicPage} from '../pages/basic/basic'
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login'
import {MainTabsPage} from '../pages/main-tabs/main-tabs'
import {MapPage} from '../pages/map/map'
import {OfferPage} from '../pages/offer/offer'
import {SearchPage} from '../pages/search/search'
import {WelcomePage} from '../pages/welcome/welcome'
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
    WelcomePage,
    MapPage,
    OfferPage,
    SearchPage,
    MainTabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,  // imports firebase/auth, only needed for auth
                            // features,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BasicPage,
    WelcomePage,
    MapPage,
    OfferPage,
    SearchPage,
    MainTabsPage,
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserserviceProvider,
  ]
})
export class AppModule
{
}
