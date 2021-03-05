import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // @Input() id?: number;

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    console.log('sdgsg: ',HEROES.find(hero => hero.id === id));
    let heroes = of(HEROES.find(hero => hero.id === id)!);
    return heroes;
    // return of(HEROES[1]);
   // return of(HEROES.find(hero => hero.id === id));
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
