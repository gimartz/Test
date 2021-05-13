import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Hero } from './hero';import { Store, select } from '@ngrx/store';import { Observable } from 'rxjs';
import { increment, decrement, } from '../counter.actions';
import { HeroesService } from './heroes.service';import { AppState } from './hero.state';
import { ToastrService } from 'ngx-toastr'
import { FormBuilder,FormGroup } from "@angular/forms"
import {RxwebValidators } from "@rxweb/reactive-form-validators"
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  providers: [HeroesService],
  styleUrls: ['./heroes.component.css']
})
@Injectable()
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  editHero: Hero; // the hero currently being edited
 count$: Observable<Hero>;
   userFormGroup:FormGroup;
  creditCardTypes = [
    "Visa",

    "AmericanExpress",

    "Maestro",

    "JCB",

    "Discover",

    "DinersClub",

    "MasterCard"
]
  constructor(
    private heroesService: HeroesService,
    public toastr: ToastrService,private formBuilder:FormBuilder,
    private store: Store<{count:AppState}>
  ) {
      this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
    this.getHeroes();
      this.userFormGroup = this.formBuilder.group({
      cardType:['Visa'],
      creditCard:['',RxwebValidators.creditCard ({fieldName:'cardType'})],
      creditAmount:['',RxwebValidators.creditCard ({fieldName:'cardMonth'})],
    })
  }

  getHeroes(): void {
    this.heroesService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  add(
    creditCardNumber: string,
    cardHolder: string,
    expirationDate: string,
    securityCode: string,
    MonthlyAdvertisingBudget: number
  ): void {
    this.editHero = undefined;
    cardHolder = cardHolder.trim();
    securityCode = securityCode.trim();

    if (!cardHolder) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Hero = {
      creditCardNumber,
      cardHolder,
      securityCode,

      expirationDate,MonthlyAdvertisingBudget
    } as Hero;

    
      this.heroesService
        .addHero(newHero)
        .subscribe(hero => this.heroes.push(hero))

      this.toastr.success('This is a vaild form.', 'Success!', {
        positionClass: 'toast-bottom-center'
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService.deleteHero(hero.id).subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }

  edit(hero) {
    this.editHero = hero;
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    }
  }

  update() {
    if (this.editHero) {
      this.heroesService.updateHero(this.editHero).subscribe(hero => {
        // replace the hero in the heroes list with update from server
        const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
        if (ix > -1) {
          this.heroes[ix] = hero;
        }
      });
      this.editHero = undefined;
    }
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
