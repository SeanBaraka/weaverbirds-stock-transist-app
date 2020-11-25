import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StockDataService} from "../../services/stock-data.service";

@Component({
  selector: 'app-shops-available',
  templateUrl: './shops-available.component.html',
  styleUrls: ['./shops-available.component.sass']
})
export class ShopsAvailableComponent implements OnInit {
  shops: any[] = [];
  shopForm = this.fb.group({
    name: [''],
    desc: ['']
  });

  constructor(private fb: FormBuilder, private stockService: StockDataService) { }

  ngOnInit(): void {
    this.shopsList();
  }

  shopsList(): void {
    this.stockService.getShops().subscribe((data) => {
      this.shops = data;
    });
  }

  addShop(): void {
    this.stockService.addShop(this.shopForm.value).subscribe((response) => {
      if (response) {
        this.shopsList();
      }
    });
  }
}
