import { Component, OnInit } from '@angular/core';
import { CurrencyStruct } from '../currency-struct';
import { CurrencyService } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})

export class CurrencyListComponent implements OnInit {

  constructor(private currencyService: CurrencyService) { }

  currencies: CurrencyStruct[] = [];

  getCurrencies(): void {
    this.currencyService.getRates()
      .subscribe(currencies => {
        let tempArray: CurrencyStruct []  = Object.entries(currencies).map(item =>  {
          return {
            id: item[0],
            description: item[1] as string
          };
        });
        this.currencies = tempArray;
      });
  }

  ngOnInit(): void {
    this.getCurrencies();
  }
}
