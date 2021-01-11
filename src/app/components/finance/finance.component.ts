import { Component, OnInit } from '@angular/core';
import {RealTimeDataService} from "../../services/real-time-data.service";

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass']
})
export class FinanceComponent implements OnInit {

  constructor(
    private dataService: RealTimeDataService
  ) { }

  ngOnInit(): void {
    this.dataService.getAccountBalance();
  }

}
