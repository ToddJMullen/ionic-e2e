import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit{

  accountUser: string;
  userInfo: any[] = [];
  rewardInfo: any[] = [];

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public userService: UserServiceProvider
  ) {
  }

  ionViewCanEnter():boolean {
    //ionic route guard method, return true => they CAN access
    return this.userService.success;
  }//ionViewCanEnter


  ngOnInit(){
    this.accountUser = this.userService.user;

    this.userService.storageControl( "get", this.accountUser )
    .then( userData => {
      console.log(`Got user info: ${this.accountUser}:`, userData );
      this.userInfo = userData
    });
    
    this.userService.storageControl( "get", `${this.accountUser}-rewards` )
    .then( rewardData => {
      console.log(`Got reward info: ${this.accountUser}:`, rewardData );
      this.rewardInfo = rewardData;
    })

  }//ngOnInit


}//AccountPage
