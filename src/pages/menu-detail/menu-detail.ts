import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the MenuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage implements OnInit {

  DEFAULT_FOR_PAGE_RELOAD = "moc";

  theCoffee = {
    id:""
    ,name:""
    ,description:""
    ,img:""
    ,small:0
    ,medium:0
    ,large:0
    ,size:""
    ,price:0
    ,milk:"no"
    ,whip:"no"
    ,orderId: ""
  }

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,private menuList: MenuServiceProvider
    ,private cartSvc: CartServiceProvider
    ,private userSvc: UserServiceProvider
  ) {
  }

  ngOnInit():void{
    console.log('ngOnInit')
    //provide a default for autoreload in ionic serve + save
    let id = this.navParams.get("id") || this.DEFAULT_FOR_PAGE_RELOAD;
    this.menuList.getOne(id)
        .then( ret => this.initObject(ret) );
  }//ngOnInit

  initObject(item):void{
    console.log('initObject', item );
    this.theCoffee.id            = item.id;
    this.theCoffee.img           = item.img;
    this.theCoffee.name          = item.name;
    this.theCoffee.description   = item.description;
    this.theCoffee.small         = item.small;
    this.theCoffee.medium        = item.medium;
    this.theCoffee.large         = item.large;
    this.theCoffee.price         = item.small;//set default small price
    this.theCoffee.size          = "small";//set default small price
  }//initObject


  addToCart():void{
    console.log('addToCart');
    if( !this.userSvc.success ){
      this.userSvc.displayAlert(`Cannot Add`, `You must register before you can order.`);
      return;//no coffee for you!
    }
    //I don't like this, refactor to switch() once tutorial confirmed/complete
    if( this.theCoffee.price === this.theCoffee.small ){
      this.theCoffee.size = "small";
    }
    else if( this.theCoffee.price === this.theCoffee.medium ){
      this.theCoffee.size = "medium";
    }
    else{
      this.theCoffee.size = "large";
    }
    this.theCoffee.price = Number(this.theCoffee.price);//recast to number to counter string value of select

    this.cartSvc.addItem( this.theCoffee );
    this.userSvc.displayAlert(`${this.theCoffee.size} ${this.theCoffee.name}`, `Added to Cart`);

    console.log('addToCart() got:', this.theCoffee );
    
  }//addToCart
    
    
    
    
    

}
