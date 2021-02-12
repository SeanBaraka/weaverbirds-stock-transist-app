import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopManagerService {
  /** shop manager service,
   * this one here will do stuff, and more stuff, and more stuff.
   * what stuff you may ask, stuff relating to saving the current state of
   * the application in relation to the selected shop.
   * This will help in the display of menu's, i.e. top navigation menus as well as
   * component specific menus that rely on a particular shop.
   */
  constructor() { }

  /** checks wheather we have a saved instance of a shop*/
  getShopSaved(): any {
    if (localStorage.getItem('active-shop')) {
      return localStorage.getItem('active-shop')
    }
  }

  /** save a shop instance for future use. */
  saveShop(shopDetails: any): any {
    const shop = this.getShopSaved();
    if (shop != null || shop != undefined) {
      localStorage.removeItem('active-shop')
      localStorage.setItem('active-shop', shopDetails)
      return
    }
  }
}
