import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from  "angularfire2/auth";

import { FIREBASE_ID, FIREBASE_KEY, FIREBASE_SENDER_ID } from "./Keys";
//services
import { UserServiceProvider } from '../providers/user-service/user-service';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';



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
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    ,AngularFireModule.initializeApp(firebaseConfig)
    ,AngularFireDatabaseModule
    ,AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
