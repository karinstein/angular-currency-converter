import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CurrencyStruct } from './currency-struct';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private host = 'api.frankfurter.app';
  private latestRatesUrl = `https://${this.host}/latest`;

  getRates(): Observable<any> {
    let currenciesUrl = `https://${this.host}/currencies`;
    let rates =  this.http.get<any>(currenciesUrl)
    .pipe(
      // tap(_ => this.log('fetched rates')), // WHAT DOES THIS DO??
      catchError(this.handleError<any>('getRates', []))
    );
    return rates;
  }

  convert(inAmount: number,inCurr: string,outCurr:string): Observable<any> {
    let convertionUrl = `${this.latestRatesUrl}?amount=${inAmount}&from=${inCurr}&to=${outCurr}`;
    console.log(convertionUrl);
    let outAmount =  this.http.get<any>(convertionUrl)
    .pipe(
      // tap(_ => this.log('fetched rates')),
      catchError(this.handleError<any>('convert', []))
    );
    return outAmount;
    // return of(inAmount);
  }

private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CurrencyService: ${message}`);
  }

}
