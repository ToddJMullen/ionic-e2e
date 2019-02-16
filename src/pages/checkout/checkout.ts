import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit {

  order: any[];
  orderTotal: number;
  customer: any;


  rewardsDisplay:boolean;
  discountUsed:boolean;

  rewardList:any[];
  discount:any;

  discountAmount:number = 0;
  discountTotal:number = 0;


  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,private cartSvc:CartServiceProvider
    ,private userSvc:UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  ngOnInit():void{
    console.log('ngOnInit');
    // this.userSvc.user = this.customer;//he says this isn't working anyway?
    this.cartSvc.getCart()
      .then( theCart => this.order = theCart )
      .then( cart => this.sumTotal(cart) )
      .then( sum => this.orderTotal = sum )
      .then( cash => this.userSvc.returnUser() )
      .then( user => this.loadRewards(user) )
    ;
  }//ngOnInit
    

  	
  addRewards():void{
    console.log('addRewards');
    this.rewardsDisplay = !this.rewardsDisplay;
  }//addRewards
    
  
  	
  loadRewards(user):void{
    console.log('loadRewards', user );
    this.userSvc
    .storageControl("get",`${user}-rewards`)
    .then(rewards => {
        console.log(`loadRewards ${user} found:`, rewards );
          this.customer = user;
          if( !rewards ){
            let tempObj = {rewardId: "No rewards Generated", amount: 0};
            this.rewardList.push( tempObj );
          }
          else {
            this.rewardList = rewards;
          }
        })
  }//loadRewards


  	
  applyReward(reward):void{
    console.log('applyReward', reward );
    let tempAmt = this.orderTotal - reward.amount;

    if( tempAmt <= 0 ){
      this.userSvc.displayAlert("Unable to Apply","You cannot use rewards that create a credit");
    }
    else {
      this.discount = reward;
      this.discountAmount = reward.amount;
      this.discountTotal = this.orderTotal - reward.amount;
      this.discountUsed = true;
    }
  }//applyReward

  
  	
  removeReward():void{
    console.log('removeReward');
    this.discount = '';
    this.discountUsed = false;
  }//removeReward
    
    
    

  sumTotal(order:any[]):Promise<any>{
    console.log('sumTotal', order );
    return Promise.resolve(
      order.reduce( (total:number, item: any) => total + item.price, 0 )
    );
  }//sumTotal
    



  removeOne( itemId, itemPrice ):void{
    console.log('removeOne',  itemId, itemPrice  );
    if( this.discountTotal != 0 ){
      let tempAmt = this.discountAmount - itemPrice;
      if( tempAmt <=0 ){
        this.userSvc.displayAlert(`Unable to apply`, `You cannot use rewards that create a credit.`);
      }
    }
    else {
      this.cartSvc.removeItem( itemId, itemPrice );
      this.sumTotal( this.order )
      .then( sum => this.orderTotal = sum )
      .then( discount => this.discountTotal = discount - this.discount.amount )
      ;
    }
  }//removeOne
    
        
    

}
