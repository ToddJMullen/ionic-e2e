import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.registerPage = "RegisterPage"; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
