import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input() hero!: Hero;
  hero?: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // console.log(this.route.snapshot.paramMap);

//    const id = +this.route.snapshot.paramMap.get('id')!.valueOf;
    console.log(this.route.snapshot.paramMap);

    // const id = +this.route.snapshot.paramMap.get('id')!;
    let id = +this.route.snapshot.paramMap.get('id')!;
    console.log('hero detail id: ',id || 111);
    id = id || 11;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
