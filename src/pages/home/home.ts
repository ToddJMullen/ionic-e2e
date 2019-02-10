import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { FCM } from '@ionic-native/fcm';


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
    // ,public fcm:FCM
  ) {
      //video shows these methods in constructor, but I had them in ngOnInit()
      //not sure if that was causing the promise error???
      this.loginPage = "LoginPage";

      this.ngFireAuth.auth.onAuthStateChanged( creds => {
        if( creds ){
          this.loggedIn = this.userService.user = creds.email;
        }
      });
      // this.initFcm();

    }

  ngOnInit(){
    //these were accidentally put in this method, not contructor?
    // this.loginPage = "LoginPage";

    // this.ngFireAuth.auth.onAuthStateChanged( creds => {
    //   if( creds ){
    //     this.loggedIn = this.userService.user = creds.email;
    //   }
    // });
    // // this.initFcm();
  }


  myPagePush(page){
    console.log('myPagePush()', page );
    
    this.navCtrl.push( page )
    .then( result => {
      if( !result ){//nothing is returned if they can't access the page
        this.userService.displayAlert("Sorry","You must be logged to access this page.")
      }
    })
  }
  
  
  // initFcm(){
  //   this.fcm.onNotification().subscribe( data => {
  //     if( data.wasTapped ){
  //       console.log(`Tray notification tap data:`, data );
  //     }
  //     else {
  //       console.log(`Notification data while in app:`, data );
  //       this.userService.displayAlert( "Sent", String(data) );
  //     }
  //   }
  //   , err => {
  //     console.error(`Problem in initFcm()`, err );
  //   });
  // }

  logout(){
    this.userService.logout();
    this.loggedIn = "";
    // this.ngFireAuth.auth.signOut()
    // .then( rsp => this.loggedIn = "" )
    // .catch( err => console.log(err) );
  }

}
