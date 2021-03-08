import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Currency } from './currency';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // https://api.frankfurter.app/currencies
  // latest?from=USD&to=GBP,EUR
  private host = 'api.frankfurter.app';
  private latestRatesUrl = `https://${this.host}/latest`;

  getRates(): Observable<any> {
    let currenciesUrl = `https://${this.host}/currencies`;
    let rates =  this.http.get<any>(currenciesUrl)
    .pipe(
      // tap(_ => this.log('fetched rates')),
      catchError(this.handleError<any>('getRates', []))
    );
    return rates;
    // return of(rates); // WHY DOESN'T THIS WORK?!!!???
  }

  convert(inAmount: number,inCurr: string,outCurr:string): Observable<any> {
    let convertionUrl = `${this.latestRatesUrl}?amount=${inAmount}&from=${inCurr}&to=${outCurr}`;
    console.log(convertionUrl);
    let outAmount =  this.http.get<any>(convertionUrl)
    .pipe(
      catchError(this.handleError<any>('convert', []))
    );
    return outAmount;
    // return of(inAmount);
  }

  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   let heroes = of(HEROES.find(hero => hero.id === id)!);
  //   return heroes;
  // }

private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CurrencyService: ${message}`);
  }

}
