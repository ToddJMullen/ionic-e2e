import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
    ,pwd: "test123"
  }

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public ngFireAuth: AngularFireAuth
    ,public userService: UserServiceProvider
  ) {
    this.registerPage = "RegisterPage"; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    if( !this.login.email || this.login.pwd.length < 6 ){
      this.userService.displayAlert("Login Error","Missing email or password!");
      return;
    }

    this.userService.login( this.login.email, this.login.pwd )
      .then( rsp => {
        if( this.userService.success ){
          this.navCtrl.push( HomePage );
        }
        else {
          this.login.email = "";
          this.login.pwd = "";
          this.userService.displayAlert("Login Failed", "Your email & password combination was not found.")
        }
      })
      ;
    // this.ngFireAuth.auth.signInWithEmailAndPassword( this.login.email, this.login.pwd )
    // .then( user => {
    //   this.navCtrl.push( HomePage );
    // })
    // .catch( err => console.error(err) );
  }

}
