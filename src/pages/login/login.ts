import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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

  login = {
    email: "test@test.com"
    ,pwd: ""
  }

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public ngFireAuth: AngularFireAuth
  ) {
    this.registerPage = "RegisterPage"; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    if( !this.login.email || this.login.pwd.length < 6 ){
      alert("Bad login");//temp since he'll probably make the alert util app wide
      //I don't want to implement the same solution in a different way and create conflicts
      return;
    }
    this.ngFireAuth.auth.signInWithEmailAndPassword( this.login.email, this.login.pwd )
    .then( user => {
      this.navCtrl.push( HomePage );
    })
    .catch( err => console.error(err) );
  }

}
