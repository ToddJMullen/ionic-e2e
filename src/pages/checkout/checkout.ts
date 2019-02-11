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
    this.userSvc.user = this.customer;
    this.cartSvc.getCart()
      .then( theCart => this.order = theCart )
      .then( cart => this.sumTotal(cart) )
      .then( sum => this.orderTotal = sum )
    ;
  }//ngOnInit
    

  sumTotal(order:any[]):Promise<any>{
    console.log('sumTotal', order );
    return Promise.resolve(
      order.reduce( (total:number, item: any) => total + item.price, 0 )
    );
  }//sumTotal
    
  removeOne( itemId, itemPrice ):void{
    console.log('removeOne',  itemId, itemPrice  );
    this.cartSvc.removeItem( itemId, itemPrice );
    this.sumTotal( this.order )
        .then( sum => this.orderTotal = sum );
  }//removeOne
    
        
    

}
