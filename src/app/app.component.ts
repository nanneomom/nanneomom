import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import firebase from 'firebase';
import {Platform} from 'ionic-angular';

import {BasicPage} from '../pages/basic/basic';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
import {UserserviceProvider} from '../providers/userservice/userservice'

    @Component({templateUrl: 'app.html'})
export class MyApp
{
  rootPage: any;

  constructor(
      platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      public userServiceProvider: UserserviceProvider)
  {
    platform.ready().then(() => {
      var fake: boolean = true;

      if (fake)
      {
        this.rootPage = LoginPage;
        statusBar.styleDefault();
        splashScreen.hide();
      }
      else
      {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (!user)
          {
            this.rootPage = LoginPage;
          }
          else
          {
            if (userServiceProvider.needMoreInfo())
            {
              this.rootPage = BasicPage;
            }
            else
            {
              this.rootPage = WelcomePage;
            }
          }
          unsubscribe();
          statusBar.styleDefault();
          splashScreen.hide();
        });
      }
    });
  }
}
