import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
    .subscribe( dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.leader = leader);
  }

}
