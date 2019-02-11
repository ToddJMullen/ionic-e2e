import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {


  myCoffee:any[] = [];

  detailPage: any;

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,private menuList: MenuServiceProvider
    ) {
  }

  ngOnInit():void{
    console.log('ngOnInit');
    this.detailPage = "MenuDetailPage";
    this.grabMenu();    
  }//ngOnInit
  
  
  grabMenu():void{
    console.log('grabMenu')
    this.menuList.getCafeDb()
    .then( coffee => this.myCoffee = coffee );
  }//grabMenu
  

  chooseCafe(id):void{
    console.log('chooseCafe', id );
    this.navCtrl.push( this.detailPage, {
      id: id//pass the id to the page
    });
  }//chooseCafe
    
  
    
    
    
    
    
    
    

}
