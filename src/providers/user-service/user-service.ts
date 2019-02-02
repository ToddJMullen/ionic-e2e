import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { Storage } from "@ionic/storage";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { RewardServiceProvider } from '../reward-service/reward-service';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  items: FirebaseListObservable<any>;

  success:boolean;//tracks login success

  user:string;


  constructor(
    public alertCtrl: AlertController
    ,public ngFireAuth: AngularFireAuth
    ,public storage: Storage
    ,public ngFireDb: AngularFireDatabase
    ,public rewards: RewardServiceProvider
  ) {
    this.items = ngFireDb.list("/users");
    console.log(`Firebase: ${firebase}`);
  }



  displayAlert( title:string, msg:string ){
    let theAlert = this.alertCtrl.create({
      title: title
      ,subTitle: msg
      ,buttons: ["OK"]
    });
    theAlert.present();
  }


  logout(){
    //this.storageControl("delete");
    this.ngFireAuth.auth.signOut()
    .then( rsp => {
      this.displayAlert("You have been logged out.", "Where you going?");
      this.success = false;
    } )
    .catch( err => console.error("UserService::logout().catch()", err) );
  }

  storageControl( action, key?, value? ){
    //??dexi?? as a potentially better/more powerful solution
    if( action == "set" ){
      return this.storage.set(key, value);
    }
    if( action == "get" ){
      return this.storage.get(key);
    }
    if( action == "delete" ){
      if( !key ){
        this.displayAlert("Warning!", "Removing all user data!");
        return this.storage.clear();
      }
      else {
        this.displayAlert("Deleting...", `Deleting ${key} user data!`);
        this.storage.remove( key );
      }
    }
  }


  saveNewUser( user ){
    let userObj = {
      creation: new Date().toDateString()
      ,logins: 1
      ,rewardCount: 0
      ,lastLogin: new Date().toLocaleString()
      ,id: ""
    }
    //push user's data out to Fb Db
    this.items.push({
        username: user
        ,creation: userObj.creation
        ,logins: userObj.logins
        ,lastLogin: userObj.lastLogin
        ,rewardCount: userObj.rewardCount
    })
    .then( rsp => {
      userObj.id = rsp.key;//use Fb remote key as ref in local storage
      return this.storageControl( "set", user, userObj )
    })
    ;
    return this.storageControl("get", user );//needed to prevent errors when method chaining
  }


  updateUser( user, userData ){
    let newData = {//all fields must be copied, bc storage update is an overwrite
      creation: userData.creation
      ,lastLogin: new Date().toLocaleString()
      ,rewardCount: userData.rewardCount//managed by rewards service
      ,logins: userData.logins
      ,id: userData.id
    };
    this.items.update( newData.id, {
      logins: newData.logins
      ,rewardCount: newData.rewardCount
      ,lastLogin: newData.lastLogin
    });
    return this.storageControl("set", user, newData );
  }


  login( user, password ){
    return this.ngFireAuth.auth.signInWithEmailAndPassword( user, password )
      .then( rsp => {
        this.storageControl("get", user )
          .then( stored => {
            if( !stored ){//they are new
              this.saveNewUser( user )
              .then( addRsp => this.displayAlert(`Welcome ${user.username}`, "New Account Saved") );
            }
            else {//they just logged back in
              this.rewards.rewardsCheck( user, stored )
              .then( rewardedUser => {
                  this.updateUser( user, rewardedUser )
                  .then( updated => console.log(`User data updated:`, updated ) )
              })
            }
          })
          this.success = true;
          return rsp;
      })
      .catch( err => {
        this.success = false;
        this.displayAlert("Login Error", String(err) );
        return err;
      })
  }


}
