import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  public clickedLetter: string;
  public gameStage: number;
  private subscriptions$ = new Subscription();

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.getCurrentGameStage();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  getCurrentGameStage(): void {
    this.subscriptions$.add(
      this.counterService.currentGameStage.subscribe((value: number) => {
        this.gameStage = value;
      })
    );
  }

  checkLetter(letter: string): void {
    this.clickedLetter = letter;
  }

}
