import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameStateEnum } from 'src/app/enums/game-state.enum';
import { AnswersService } from 'src/app/services/answers.service';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-password-panel',
  templateUrl: './password-panel.component.html',
  styleUrls: ['./password-panel.component.scss']
})
export class PasswordPanelComponent implements OnInit, OnChanges {
  @Input() clickedLetter: string;

  public answersList: string[];
  public selectedAnswersForGame: string[] = [];
  public currentAnswer = '';
  public hiddenAnswer: string[] = [];
  public gameStage: number;
  private readonly numberOfStages = 5;

  constructor(
    private counterService: CounterService,
    private router: Router,
    private answersService: AnswersService) { }

  ngOnInit(): void {
    this.fetchAnswersList();
    this.counterService.gameState.subscribe(value => console.log('gameState: ', value));
    console.log('this.counterService.gameTime: ', this.counterService.gameTime);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfAnswerIncludesSelectedLetter(changes);
  }

  getFiveUniqueAnswers(): void {
    do {
      const randomIndex = Math.floor(Math.random() * this.answersList.length);
      if (!this.selectedAnswersForGame.includes(this.answersList[randomIndex].toUpperCase())) {
        this.selectedAnswersForGame.push(this.answersList[randomIndex].toUpperCase());
      }
    } while (this.selectedAnswersForGame.length < this.numberOfStages);
  }

  fetchAnswersList(): void {
    this.answersService.getAnswers().subscribe((res: string[]) => {
      this.answersList = res;
      this.getFiveUniqueAnswers();
      this.getCurrentAnswer();
    });
  }

  getCurrentAnswer(): void {
    this.currentAnswer = this.selectedAnswersForGame[this.counterService.currentGameStageValue - 1];
    this.counterService.currentAnswer.next(this.currentAnswer);
    console.log('currentAnswer: ', this.currentAnswer);
  }

  checkIfAnswerIncludesSelectedLetter(changes: SimpleChanges): void {
    const selectedLetter = changes.clickedLetter.currentValue;
    if (changes.clickedLetter.currentValue && this.currentAnswer.split('').includes(selectedLetter)) {
      for (let i = 0;  i < this.currentAnswer.length; i++) {
        if (this.currentAnswer.split('')[i] === selectedLetter) {
          this.updateHiddenAnswer(selectedLetter, i);
        }
      }
      if (this.checkIfHiddenAnswerEqualsCurrentAnswer()) {
        if (this.counterService.currentGameStageValue < this.numberOfStages) {
          this.updateGameStage();
          this.getCurrentAnswer();
          this.updateMissedGuessesCounterValue(true);
          this.resetHiddenAnswer();
        } else {
          this.router.navigate(['/win']);
          this.counterService.pauseTimer();
          this.updateMissedGuessesCounterValue(true);
          this.updateGameState(GameStateEnum.SUCCESS);
        }
      }
    } else if (changes.clickedLetter.currentValue && !this.currentAnswer.split('').includes(selectedLetter)) {
      this.updateMissedGuessesCounterValue();
      if (!this.checkIfAnyGuessesLeft()) {
        this.updateGameState(GameStateEnum.FAILURE);
        this.router.navigate(['/game-over']);
        this.counterService.pauseTimer();
        this.updateMissedGuessesCounterValue(true);
      }
    }
  }

  updateHiddenAnswer(selectedLetter: string, index: number): void {
    document.querySelector('.unknown-letter' + index).innerHTML = selectedLetter;
    this.hiddenAnswer[index] = selectedLetter;
  }

  resetHiddenAnswer(): void {
    this.hiddenAnswer = [];
    const hiddenLetters = document.querySelectorAll('.letter > span');
    hiddenLetters.forEach(letter => {
      letter.innerHTML = '_';
    });
  }

  updateMissedGuessesCounterValue(resetCounter?: boolean): void {
    resetCounter
      ? this.counterService.missedGuessesCounterValue = 0
      : this.counterService.missedGuessesCounterValue += 1;
  }

  checkIfHiddenAnswerEqualsCurrentAnswer(): boolean {
    return this.hiddenAnswer.join('') === this.currentAnswer;
  }

  checkIfAnyGuessesLeft(): boolean {
    return this.counterService.missedGuessesCounterValue < this.counterService.maxGuessesNumber;
  }

  updateGameState(state: GameStateEnum.PENDING | GameStateEnum.SUCCESS | GameStateEnum.FAILURE): void {
    this.counterService.gameState.next(state);
  }

  updateGameStage(): void {
    this.counterService.currentGameStageValue += 1;
  }

}
