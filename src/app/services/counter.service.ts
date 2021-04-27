import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public missedGuessesCounter = new BehaviorSubject<number>(0);
  public maxGuessesNumber = 5;

  constructor() { }

  set missedGuessesCounterValue(value: number) {
    this.missedGuessesCounter.next(value);
  }

  get missedGuessesCounterValue(): number {
    return this.missedGuessesCounter.getValue();
  }
}
