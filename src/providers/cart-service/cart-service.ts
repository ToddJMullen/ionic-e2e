// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {

  theCart:any[] = [];

  constructor(
    // public http: HttpClient
    ){
    console.log('Hello CartServiceProvider Provider');
  }

  getCart():Promise<any[]>{
    console.log('getCart');
    return Promise.resolve(this.theCart);
  }//getCart


  addItem(myItem):void{
    console.log('addItem', myItem );
    this.theCart.push(myItem);
  }//addItem

  removeItem(id, price):void{
    console.log('removeItem', id, price );
    let tmpId = `${id}-${price}`;
    let idx = this.theCart.map( i => i.orderId ).indexOf(tmpId);
    if( idx > -1 ){
      // this.theCart = 
      this.theCart.splice(idx, 1);
    }
  }//removeItem
    
    
    
    

  
}
