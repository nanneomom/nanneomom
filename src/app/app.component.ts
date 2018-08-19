import {Component} from '@angular/core';
// import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import firebase from 'firebase';
import {Platform} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import {BasicPage} from '../pages/basic/basic';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
import {ChatServiceProvider} from '../providers/chat-service/chat-service';
import {FcmProvider} from '../providers/fcm/fcm';
import {UserserviceProvider} from '../providers/userservice/userservice';

@Component({templateUrl: 'app.html'})
export class MyApp
{
  rootPage: any;

  constructor(
      platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      public userServiceProvider: UserserviceProvider,
      public chatServiceProvider: ChatServiceProvider, fcm: FcmProvider,
      toastCtrl: ToastController)
  //, private push: Push)
  {
    platform.ready().then(() => {
      var fake: boolean = true;

      // this.setupPush();

      fcm.getToken();

      // Listen to incoming messages
      fcm.listenToNotifications()
          .pipe(tap(msg => {
            // show a toast
            const toast = toastCtrl.create({message: msg.body, duration: 3000});
            toast.present();
          }))
          .subscribe();


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

  /*
  setupPush()
  {
    // to check if we have permission
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled)
      {
        console.log('We have permission to send push notifications');
      }
      else
      {
        console.log('We do not have permission to send push notifications');
      }
    });

    const options: PushOptions = {
      android: {senderID: '124360184526'},
      ios: {alert: 'true', badge: true, sound: 'false'},
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification')
        .subscribe(
            (notification: any) =>
                console.log('Received a notification', notification));

    pushObject.on('registration')
        .subscribe(
            (registration: any) =>
                console.log('Device registered', registration));

    pushObject.on('error').subscribe(
        error => console.error('Error with Push plugin', error));
  }
  */
}
