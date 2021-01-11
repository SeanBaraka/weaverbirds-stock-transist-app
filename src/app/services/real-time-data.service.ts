import { Injectable } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import * as socketIO from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {
  socket: socketIO.Socket;
  constructor() {}

  getAccountBalance(): any {
    this.socket.on('apiresult', (data) => {
      console.log(data);
    });
  }

  /** starts the connection to the socket io server */
  startConnection(): any {
    if (this.socket == null || !this.serverConnected()) {
      this.socket = socketIO.io(environment.socketUrl);
      return this.socket
    } else {
      return this.socket
    }
  }

  /** check if the connection was established */
  serverConnected(): boolean {
    return this.socket.connected
  }

  /** get the confirmed transaction details */
  getTransactionDetails(success): any {
    this.socket.on('paymentConfirmed', (response: any) => {
     return response ? success(response) : null
    })
  }

  getMobileMoneyBalance(balance): any {
    this.socket.on('updateBalance', (response: any) => {
      return response ? balance(response) : null
    })
  }
}
