import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-reports',
  templateUrl: './shop-reports.component.html',
  styleUrls: ['./shop-reports.component.sass']
})
export class ShopReportsComponent implements OnInit {

  shop: any;
  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    this.shop = history.state.shop
  }

  navigateBack(): void {
    this.router.navigate(['admin', 'shop'], {
      state: {
        shop: this.shop
      }
    })
  }

}
