import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  menuData = [
    {title:"Our Menu"   ,pic:"assets/img/soup1.jpg", pushPage:"MenuPage"}
    ,{title:"Account"   ,pic:"assets/img/coffee-people3.jpg", pushPage:"AccountPage"}
    ,{title:"Locations" ,pic:"assets/img/cafe2.jpg", pushPage:"LocationsPage"}
    ,{title:"About"     ,pic:"assets/img/coffee6.jpg", pushPage:"AboutPage"}
  ]

  loginPage:any;
  loggedIn:string;

  constructor(
    public navCtrl: NavController
    ,public ngFireAuth: AngularFireAuth
    ,public userService: UserServiceProvider
  ) {
  }

  ngOnInit(){

    this.loginPage = "LoginPage";

    this.ngFireAuth.auth.onAuthStateChanged( creds => {
      if( creds ){
        this.loggedIn = this.userService.user = creds.email;
      }
    })
  }


  myPagePush(page){
    this.navCtrl.push( page )
    .then( result => {
      if( !result ){
        this.userService.displayAlert("Sorry","You must be logged to access this page.")
      }
    })
  }


  logout(){
    this.userService.logout();
    this.loggedIn = "";
    // this.ngFireAuth.auth.signOut()
    // .then( rsp => this.loggedIn = "" )
    // .catch( err => console.log(err) );
  }

}
