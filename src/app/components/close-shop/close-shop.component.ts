import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StockDataService} from "../../services/stock-data.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmltopdf from 'html-to-pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-close-shop',
  templateUrl: './close-shop.component.html',
  styleUrls: ['./close-shop.component.sass']
})
export class CloseShopComponent implements OnInit {
  stockProducts: Array<Product> = [];
  dayStockProducts: Array<Product> = [];

  @ViewChild('content') content: ElementRef;


  constructor(private dialog: MatDialogRef<CloseShopComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private stockService: StockDataService) { }

  closeStockForm = this.fb.group({
    name: ['', Validators.required],
    availableUnits: ['', Validators.required],
    unitPrice: ['', Validators.required]
  });
  finished = false;

  ngOnInit(): void {
    this.getDayStock();
  }

  getDayStock(): void {
    const shortDate = new Date(Date.now()).toISOString().split('T')[0];

    this.stockService.getDaysStock(this.data.shopId, shortDate).subscribe((response) => {
      this.dayStockProducts = response;
    });
  }

  updateStock(): void {
  }

  closeShop(): void {
    this.stockService.closeShop(this.data.shopId, this.dayStockProducts).subscribe((resp) => {
      if (resp) {
        this.finished = true;
        const html = htmltopdf(`${this.content.nativeElement.outerHTML}`, {
          defaultStyles: {
            table: ''
          }
        });
        const documentDefinition = { content: [
           html  , {
          image: 'assets/Logo.png'
        }
          ]};
        pdfMake.createPdf(documentDefinition).print(); // print the table data
        this.dialog.close(); // close the dialog
      }
    });
  }

  updateStockRecord(index: number, changedValue: any): void {
    this.dayStockProducts[index].closingUnits = changedValue;
    this.dayStockProducts[index].soldUnits = this.dayStockProducts[index].openingUnits - this.dayStockProducts[index].closingUnits;
  }

  getStockTotal(): number {
    const totalStock = [];
    this.dayStockProducts.forEach((item) => {
      totalStock.push(item.soldUnits);
    });

    return totalStock.reduce((a, b) => a + b , 0);
  }

  getStockTotalAmount(): number {

    const totalAmount = [];
    this.dayStockProducts.forEach((item) => {
      totalAmount.push(item.soldUnits * item.unitPrice);
    });

    return totalAmount.reduce((a, b) => a + b , 0);
  }

}
