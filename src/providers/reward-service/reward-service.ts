// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from "@ionic/storage";

import "rxjs/add/operator/map";
// import { Promise } from "promise-polyfill";

import { ModalController } from 'ionic-angular';
import { RewardModalPage } from "../../pages/reward-modal/reward-modal"; 

/*
  Generated class for the RewardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardServiceProvider {

  rewards:any[] = [];

  rewardList:any[] = [
    .25, .5, 1.25, 2, 1.75, .75, 1.5, 1, 2.25
  ];

  constructor(
    // public http: HttpClient
    public storage: Storage
    ,public modalCtrl: ModalController
  ) {
    console.log('Hello RewardServiceProvider Provider');
  }


  rewardsCheck( user, userData ){

    return new Promise( (resolve, reject) => {
      userData.logins++;
      if( user.logins == 2 ){
        let firstRewards = this.rewardChance( user, userData.rewardCount );
        userData.rewardCount = firstRewards;
        resolve( userData );
      }
      else if( userData.logins % 7 == 0 ){
        let newRewards = this.rewardChance( user, userData.rewardCount );
        userData.rewardCount = newRewards;
        resolve( userData );
      }
      else {
        resolve( userData );
      }

    })
  }


  rewardChance( user, rewardCount ){
    if( rewardCount == 0 ){
      rewardCount++;
      this.generateReward( user, rewardCount );
      return rewardCount;
    }
    else {
      let num = 1 + Math.round(Math.random() * 100)
      if( num >= 20 ){//I upped it to an 80% reward chance
        rewardCount++;
        this.generateReward( user, rewardCount );
        return rewardCount;
      }
      else {
        return rewardCount;
      }
    }
  }


  generateReward( user, rewardCount ){
    console.log("generateReward()", user, rewardCount );
    let l   = this.rewardList.length
    ,idx    = Math.round(Math.random() * l)
    ,reward = this.rewardList[idx]
    ,rewardObj  = {
      rewardId: `Reward-${rewardCount}`
      ,amount: reward
    }
    ;

    this.storage.get(`${user}-rewards`)
    .then( result => {
      if( !result ){
        this.rewards.push( rewardObj );
        this.storage.set(`${user}-rewards`, this.rewards )
        .then( res => this.displayReward(reward) );
      }
      else {
        this.rewards = result;
        this.rewards.push( rewardObj );
        this.storage.set(`${user}-rewards`, this.rewards )
        .then( res => this.displayReward(reward) );
      }
    })
    ;
  }

  displayReward( amount ){
    console.log(`Reward ${amount}`)
    let theModal = this.modalCtrl.create( RewardModalPage, {"rewardParam": amount} );
    theModal.present();
  }


}
