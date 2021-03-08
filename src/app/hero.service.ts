import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // https://api.frankfurter.app/currencies
  // latest?from=USD&to=GBP,EUR
  private host = 'api.frankfurter.app';
  // private heroesUrl = `https://${this.host}/latest`; // 'api/heroes';  // URL to web api
  private heroesUrl = `https://${this.host}/currencies`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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

  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  getRates(): Observable<any> {
    return this.http.get<any>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<any>('getRates', []))
    );
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  getHeroes(): Observable<Hero[]> {

    // fetch(this.heroesUrl+'?amount=10&from=GBP&to=USD')
    // fetch(this.heroesUrl)
    //   .then(resp => resp.json())
    //   .then((data) => {
    //     console.log(data.rates);
    //     // alert(`10 GBP = ${data.rates.USD} USD`);
    // });
    this.getRates().subscribe(currency => console.log(currency));
    // this.getRates().subscribe(currency => console.log(currency.rates));
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    console.log('AAA');
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    console.log('sdgsg: ',HEROES.find(hero => hero.id === id));
    let heroes = of(HEROES.find(hero => hero.id === id)!);
    return heroes;
    // return of(HEROES[1]);
   // return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
//   // getHeroes(): Hero[] {
//   //   return HEROES;
//   // }
//   // getHeroes(): Observable<Hero[]> {
//   //   const heroes = of(HEROES);
//   //   return heroes;
//   // }
//   getHeroes(): Observable<Hero[]> {
//     const heroes = of(HEROES);
//     this.messageService.add('HeroService: fetched heroes');
//     return heroes;
//   }
//   constructor(private messageService: MessageService) { }
}
