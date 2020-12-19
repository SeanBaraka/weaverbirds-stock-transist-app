import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {
  socket;
  constructor() {}

  getAccountBalance(): any {
    this.socket.on('apiresult', (data) => {
      console.log(data);
    });
  }
}
