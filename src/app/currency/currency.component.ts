import { Component, OnInit, Input } from '@angular/core';
import { CurrencyStruct } from '../currency-struct';
import { CurrencyService } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit {

  constructor(private currencyService: CurrencyService) { }

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
  maxInputValue: number = 1e+10-1;

  currencies: CurrencyStruct[] = [];

  formSubmitted: boolean = false;

  getCurrencies(): void {
    this.currencyService.getRates()
      .subscribe(currencies => {
        let tempArray: CurrencyStruct[] = Object.entries(currencies).map(item => {
          return {
            id: item[0],
            description: item[1] as string
          };
        });
        this.currencies = tempArray;
      });
  }

  validInput(inAm:number, inCur:string, outCur:string): boolean {
    return (inAm>0 && inAm<=this.maxInputValue && inCur.length>0 && outCur.length>0 && inCur!==outCur);
  }

  onSubmit(): void {
    let inAmount: number = this.inputAmount;
    let inCurr: string = this.inputCurrency.id;
    let outCurr: string = this.outputCurrency.id;

    if (this.validInput(inAmount, inCurr, outCurr)) {
      this.currencyService.convert(inAmount, inCurr, outCurr)
        .subscribe(value => {
          this.outputAmount = value.rates[outCurr];
          this.convertionOutput = `${inAmount} ${inCurr} = ${value.rates[outCurr].toFixed(2)} ${outCurr}`;
        });
      this.currencyService.convert(1, inCurr, outCurr)
        .subscribe(value => {
          this.convertionDate = `Convertion rate on ${value.date}:`;
          this.convertionRate = `${value.amount} ${inCurr} = ${value.rates[outCurr].toFixed(4)} ${outCurr}`;
        });
      this.formSubmitted = true;
    } else {
      alert('Please make sure your input value does not exceed a certain range');
    }
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.outputAmount = this.inputAmount;
  }
}
