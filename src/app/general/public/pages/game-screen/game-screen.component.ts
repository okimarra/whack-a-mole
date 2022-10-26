import { Component, OnInit } from '@angular/core';

import { interval, Subscription, timer } from 'rxjs';
import { select, Store } from "@ngrx/store";

// Interfaces
import { IHole } from "@shared/interfaces"

// Store - Reducer
import { AppState } from '@app/general/store/reducers';
// Store - Actions
import * as GameActions from "@store/actions/game.actions";
// Store - Selectors
import * as GameSelectors from "@store/selectors/game.selectors";

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {
  public gameStarted = false;

  public randomSubscription: Subscription = new Subscription;
  public timerSubscription: Subscription = new Subscription;

  public time = 10;
  public holes: IHole[] = [{ hasMole: false }, { hasMole: false }, { hasMole: false }, { hasMole: false }, { hasMole: false }, { hasMole: false }];

  public firstGame$ = this._store$.pipe(
    select(GameSelectors.selectIsFirstGame),
  );

  public score$ = this._store$.pipe(
    select(GameSelectors.selectGameScore),
  );

  public highestScore$ = this._store$.pipe(
    select(GameSelectors.selectGameHighestScore)
  );

  constructor(private _store$: Store<AppState>) { }

  ngOnInit(): void {
  }

  public startGame = (): void => {
    this._store$.dispatch(GameActions.startGame());

    this.gameStarted = true;
    this.time = 10;

    for (const h of this.holes) h.hasMole = false;

    this.timerSubscription = timer(1000, 1000).subscribe(() => {
      this.time--
      if(this.time == 0) this.endGame();
    })

    this.randomSubscription = interval(1000).subscribe(() => this.getRandomHole())
  }

  public getRandomHole = (): void => {
    this.randomSubscription.unsubscribe()

    const randomVal = Math.floor(Math.random() * this.holes.length)

    // Uses random to both set a new mole or in case a mole is in that hole make it disappear and subtract one point
    // When I saw that functionality (of making it disappear I had already done the project so I added it last moment)
    this.holes[randomVal].hasMole ? this.moleGone(this.holes[randomVal]) : this.holes[randomVal].hasMole = true;

    this.randomSubscription = interval(this.randomRange()).subscribe(() => this.getRandomHole());
  }

  public randomRange = (): number => {
    let newTime = Math.random() * (3000);
    return newTime;
  }

  public whack = (hole: IHole): void => {
    if (hole.hasMole) this._store$.dispatch(GameActions.addPoint());
    hole.hasMole = false;
  }

  public moleGone = (hole: IHole): void => {
    this._store$.dispatch(GameActions.subtractPoint());
    hole.hasMole = false;
  }

  public endGame = (): void => {
    this._store$.dispatch(GameActions.endGame());

    this.gameStarted = false;

    this.timerSubscription.unsubscribe()
    this.randomSubscription.unsubscribe()
  }
}
