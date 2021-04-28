import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateEnum } from '../enums/game-state.enum';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public missedGuessesCounter = new BehaviorSubject<number>(0);
  public maxGuessesNumber = 5;
  public currentPassword = new BehaviorSubject<string>('');
  public gameState = new BehaviorSubject<GameStateEnum.PENDING | GameStateEnum.SUCCESS | GameStateEnum.FAILURE>(GameStateEnum.PENDING);

  constructor() { }

  set missedGuessesCounterValue(value: number) {
    this.missedGuessesCounter.next(value);
  }

  get missedGuessesCounterValue(): number {
    return this.missedGuessesCounter.getValue();
  }
}
