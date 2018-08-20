import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { HomePage } from "../home/home";//needed for register/login exit nav
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registration = {
    email: ""
    ,pwd1: ""
    ,pwd2: ""
  };

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public alertCtrl: AlertController
    ,public ngFireAuth: AngularFireAuth
    ,public userService: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // displayAlert( alertTitle:string, alertSub:string ){
  //   let theAlert = this.alertCtrl.create({
  //     title: alertTitle
  //     ,subTitle: alertSub
  //     ,buttons: ["OK"]
  //   });
  //   theAlert.present();
  // }


  registerAccount(){
    if( this.registration.pwd1 != this.registration.pwd2 ){
      this.userService.displayAlert("Password Error!", "The entered passwords do not match!");
      this.registration.pwd1 = "";
      this.registration.pwd2 = "";
      return;
    }
    // if( !this.registration.email ) {
    //   this.displayAlert("Missing Email!", "Please enter a valid email.");
    //   return;
    // }
    this.ngFireAuth.auth.createUserWithEmailAndPassword( this.registration.email, this.registration.pwd1 )
    .then( rsp => this.registerSuccess(rsp) )
    .catch( err => this.userService.displayAlert("Registration Error", String(err) ) )
    ;
  }

  registerSuccess( rsp ){
    // this.displayAlert( `Welcome ${rsp.email}`
    //   ,`You have been successfully registered and automatically logged in.`
    // // );
    // this.ngFireAuth.auth.signInWithEmailAndPassword( this.registration.email, this.registration.pwd1 )
    // .then( rsp => this.navCtrl.push(HomePage) )
    // .catch( err => this.displayAlert( "Login Error", `There has been a problem logging you in.`) )

    this.userService.login( this.registration.email, this.registration.pwd1 )
    .then( rsp => this.navCtrl.push(HomePage) )
    ;
  }

}
