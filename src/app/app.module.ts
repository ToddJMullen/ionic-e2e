import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from "@ionic/storage";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from  "angularfire2/auth";

import { PayPalOriginal } from "@ionic-native/paypal";


import { FIREBASE_ID, FIREBASE_KEY, FIREBASE_SENDER_ID } from "./Keys";
//services
import { FCM } from "@ionic-native/fcm";
// ^^^ commented out due to dependency not supported by ionic serve
import { UserServiceProvider } from '../providers/user-service/user-service';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { AboutPage } from '../pages/about/about';
// import { LocationsPage } from '../pages/locations/locations';
import { RewardServiceProvider } from '../providers/reward-service/reward-service';

import { RewardModalPageModule } from '../pages/reward-modal/reward-modal.module';
import { MenuServiceProvider } from '../providers/menu-service/menu-service';
import { CartServiceProvider } from '../providers/cart-service/cart-service';




export const  firebaseConfig = {
  apiKey: FIREBASE_KEY
  ,authDomain: `${FIREBASE_ID}.firebaseapp.com`
  ,databaseURL: `https://${FIREBASE_ID}.firebaseio.com`
  ,storageBuckt: `${FIREBASE_ID}.appspot.com`
  ,messagingSenderId: FIREBASE_SENDER_ID
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // AboutPage,
    // LocationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    ,AngularFireModule.initializeApp(firebaseConfig)
    ,AngularFireDatabaseModule
    ,AngularFireAuthModule
    ,IonicStorageModule.forRoot()
    ,RewardModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // AboutPage,
    // LocationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
    ,IonicStorageModule
    ,RewardServiceProvider,
    MenuServiceProvider,
    CartServiceProvider
    ,PayPalOriginal
    ,FCM// commented out due to dependency not supported by ionic serve
  ]
})
export class AppModule {}
