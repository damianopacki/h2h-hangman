import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateEnum } from '../enums/game-state.enum';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public missedGuessesCounter = new BehaviorSubject<number>(0);
  public maxGuessesNumber = 5;
  public currentAnswer = new BehaviorSubject<string>('');
  public gameState = new BehaviorSubject<GameStateEnum.PENDING | GameStateEnum.SUCCESS | GameStateEnum.FAILURE>(GameStateEnum.PENDING);
  public gameTime = 0;
  public currentGameStage = new BehaviorSubject<number>(1);
  private gameTimeInterval: ReturnType<typeof setInterval>;

  constructor() { }

  set missedGuessesCounterValue(value: number) {
    this.missedGuessesCounter.next(value);
  }

  get missedGuessesCounterValue(): number {
    return this.missedGuessesCounter.getValue();
  }

  set currentGameStageValue(value: number) {
    this.currentGameStage.next(value);
  }

  get currentGameStageValue(): number {
    return this.currentGameStage.getValue();
  }

  startTimer(): void {
    this.gameTimeInterval = setInterval(() => {
      this.gameTime++;
      console.log('1');
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.gameTimeInterval);
  }
}
