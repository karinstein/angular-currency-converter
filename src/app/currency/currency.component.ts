import { Component, OnInit, Input } from '@angular/core';
import { CurrencyStruct } from '../currency-struct';
import { CurrencyService } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

// import {map, startWith} from 'rxjs/operators'; // material

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  constructor(private currencyService: CurrencyService) { }

  // myControl = new FormControl(); // material
  // filteredOptions: Observable<Currency[]>; // material

  inputCurrency: CurrencyStruct = {
    id: '',
    description: ''
  };
  inputAmount: number = 0;
  outputCurrency: CurrencyStruct = {
    id: '',
    description: ''
  };

  outputAmount: number = 0;
  convertionOutput: string = '';
  convertionRate: string = '';
  convertionDate: string = '';

  currencies: CurrencyStruct[] = [];

  formSubmitted: boolean = false;

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

  onSubmit(): void {
    let inAmount: number = this.inputAmount;
    let inCurr: string = this.inputCurrency.id;
    let outCurr: string = this.outputCurrency.id;
    if (inAmount>0 && inCurr.length>0 && outCurr.length>0 && inCurr!==outCurr){
      this.currencyService.convert(inAmount,inCurr,outCurr)
        .subscribe(value => {
            this.outputAmount = value.rates[outCurr];
            this.convertionOutput = `${inAmount} ${inCurr} = ${value.rates[outCurr]} ${outCurr}`;
        });
        this.currencyService.convert(1,inCurr,outCurr)
          .subscribe(value => {
              this.convertionDate = `Convertion rate on ${value.date}:`;
              this.convertionRate = `${value.amount} ${inCurr} = ${value.rates[outCurr]} ${outCurr}`;
          });
        this.formSubmitted = true;
    }
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.outputAmount = this.inputAmount;
  }

}
