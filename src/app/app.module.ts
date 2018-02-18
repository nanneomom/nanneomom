import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { UserserviceProvider } from '../providers/userservice/userservice';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { BasicPage } from '../pages/basic/basic'
import { WelcomePage } from '../pages/welcome/welcome'
import { MapPage } from '../pages/map/map'

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDDepsC_uUsRI5ONlCN-678xcjsRyLkq2U",
    authDomain: "ionic-test-cd963.firebaseapp.com",
    databaseURL: "https://ionic-test-cd963.firebaseio.com",
    projectId: "ionic-test-cd963",
    storageBucket: "",
    messagingSenderId: "178669050576"
  }
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BasicPage,
    WelcomePage,
    MapPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserserviceProvider,
  ]
})
export class AppModule { }
