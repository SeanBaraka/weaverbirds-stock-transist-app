import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductSaleService {

  constructor(private http: HttpClient) { }

  makeSale(shopId: number, saleRecordData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}shops/${shopId}/sale/`, saleRecordData);
  }

  getSales(shopId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}shops/${shopId}/sales/total/`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}customers/list`);
  }

  /** gets mpesa transaction details */
  mobilePaymentConfirmation(paymentInfo: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}payments/transaction/check`, paymentInfo)
  }
}
