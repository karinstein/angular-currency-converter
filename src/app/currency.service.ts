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
  private ratesUrl = `https://${this.host}/latest`; // 'api/heroes';  // URL to web api
  //private heroesUrl = `https://${this.host}/currencies`;

  getRates(): Observable<any> {
    let currenciesUrl = `https://${this.host}/currencies`;
    // return this.http.get<any>(this.heroesUrl)
    let rates =  this.http.get<any>(currenciesUrl)
    .pipe(
      // tap(_ => this.log('fetched rates')),
      catchError(this.handleError<any>('getRates', []))
    );
    return rates;
    // return of(rates); // WHY DOESN'T THIS WORK?!!!??? 
  }
    //  getHeroes(): Observable<Hero[]> {
    //     const heroes = of(HEROES);
    //     this.messageService.add('HeroService: fetched heroes');
    //     return heroes;
    //   }

 // getHeroes(): Observable<Hero[]> {
 //     const heroes = of(HEROES);
 //     this.messageService.add('HeroService: fetched heroes');
 //     return heroes;
 //   }this.getRates().subscribe(currency => console.log(currency.rates));
  //   this.messageService.add('CurrencyService: fetched rates');
  //   return of(HEROES);
  // }


  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  // getHeroes(): Observable<Hero[]> {
  //   this.getRates().subscribe(currency => console.log(currency.rates));
  //   this.messageService.add('CurrencyService: fetched rates');
  //   return of(HEROES);
  // }

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
