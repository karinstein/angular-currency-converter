import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  // heroes = HEROES;

  heroes: Hero[] = [];
//  heroes: Hero[];

  // selectedHero?: Hero;

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

//  constructor(private heroService: HeroService, private messageService: MessageService) { }
  constructor(private heroService: HeroService) { }

  // ngOnInit(): void {
  //   this.getHeroes();
  // }
  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //
  //   const host = 'api.frankfurter.app';
  //   fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
  //     .then(resp => resp.json())
  //     .then((data) => {
  //       console.log(`10 GBP = ${data.rates.USD} USD`);
  //     });
  // }
}
