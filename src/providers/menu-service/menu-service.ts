// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuServiceProvider {

  cafe:any[] = [
    {id:'cof', name:'Coffee', description:'The classic standard, our exclusive select blend',
    img: 'assets/img/coffee.jpg', small: 1.50, medium: 2.50, large: 3.25},
    
    {id:'lat', name:'Latte', description: 'A blend of espresso, steam milk, and foam',
    img: 'assets/img/latte.jpg', small: 2.00, medium: 3.00, large: 3.75},
    
    {id:'moc', name:'Mocha', description:'Espresso, melted chocolate, and steamed milk',
    img: 'assets/img/mocha.jpg', small: 2.30, medium: 3.15, large: 4.00},

    {id:'esp', name:'Espresso', description:'The classic espresso',
    img: 'assets/img/espresso.jpg', small: 1.75, medium: 2.50, large: 3.50},

    {id:'cap', name:'Cappuccino', description: 'Espresso, steamed milk, and a layer of foam',
    img: 'assets/img/cappuccino.jpg', small: 1.85, medium: 2.75, large: 3.65},

    {id:'ame', name:'Americano', description:'Espresso and hot water',
    img: 'assets/img/americano.jpg', small: 1.60, medium: 2.50, large: 3.45},

    {id:'mac', name:'Macchiato', description:'Espresso topped with foamed milk',
    img: 'assets/img/macchiato.jpg', small: 2.10, medium: 3.05, large: 3.90  }

  ];

  constructor(
    // public http: HttpClient
    ) {
    console.log('Hello MenuServiceProvider Provider');
  }

  getCafeDb():Promise<any[]>{
    console.log('getCafeDb')
    return Promise.resolve(this.cafe);
  }//getCafeDb
    
    
  getOne(search):Promise<any>{
    console.log('getOne', search )
    let single =  this.cafe.filter( item => item.id === search ).pop();
    return Promise.resolve( single )
  }//getOne
    
    

}
