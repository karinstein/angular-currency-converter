import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import {map, startWith} from 'rxjs/operators'; // material

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  constructor(private currencyService: CurrencyService) { }

  // myControl = new FormControl(); // material
  // filteredOptions: Observable<Currency[]>; // material

  inputCurrency: Currency = {
    id: '',
    description: ''
  };
  inputAmount: number = 0;
  outputCurrency: Currency = {
    id: '',
    description: ''
  };
  outputAmount: number = 0;

  currencies: Currency[] = [];

  getCurrencies(): void {
    this.currencyService.getRates()
      .subscribe(currencies => {
        let tempArray: Currency []  = Object.entries(currencies).map(item =>  {
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

    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.id),
    //   map(id => id ? this._filter(id) : this.currencies.slice())
    // );
  }

  // displayFn(curr: Currency): string {
  //   return (curr && curr.id) ? curr.id : '';
  // }
  //
  // private _filter(name: string): Currency[] {
  //   const filterValue = name.toUpperCase();
  //   return this.currencies.filter(curr => curr.id.toUpperCase().indexOf(filterValue) === 0);
  // }
}
