import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuessStateEnum } from 'src/app/enums/guess-state.enum';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-alphabet-panel',
  templateUrl: './alphabet-panel.component.html',
  styleUrls: ['./alphabet-panel.component.scss']
})
export class AlphabetPanelComponent implements OnInit, OnDestroy {
  @Output() onLetterClick = new EventEmitter<string>();

  public alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public gameStage;
  private currentAnswer = '';
  private subscriptions$ = new Subscription();

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.resetLetterStateOnAnswerChange();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  checkLetter(letter: string): void {
    this.onLetterClick.emit(letter);
  }

  updateLetterState(letter: HTMLElement): void {
    if (letter.classList.value.includes(GuessStateEnum.HIT || GuessStateEnum.MISS)) {
      return;
    }
    if (this.currentAnswer.includes(letter.innerHTML)) {
      letter.classList.add(GuessStateEnum.HIT);
    } else {
      letter.classList.add(GuessStateEnum.MISS);
    }
  }

  resetLetterStateOnAnswerChange(): void {
    this.subscriptions$.add(
      this.counterService.currentAnswer.subscribe((value: string) => {
        this.currentAnswer = value;
        const allDivs = document.querySelectorAll('.letter');
        allDivs.forEach(div => {
          if (div.classList.contains(GuessStateEnum.HIT)) {
            div.classList.remove(GuessStateEnum.HIT);
          } else if (div.classList.contains(GuessStateEnum.MISS)) {
            div.classList.remove(GuessStateEnum.MISS);
          }
        });
      })
    );
  }

}
