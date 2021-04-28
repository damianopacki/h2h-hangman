import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateEnum } from 'src/app/enums/game-state.enum';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-password-panel',
  templateUrl: './password-panel.component.html',
  styleUrls: ['./password-panel.component.scss']
})
export class PasswordPanelComponent implements OnInit, OnChanges {
  @Input() clickedLetter: string;

  public passwordsList = ['Argentyna', 'Polska', 'Słowacja'];
  public currentPassword: string;
  public hiddenPassword: string[] = [];

  constructor(
    private counterService: CounterService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateRandomPassword();
    this.counterService.gameState.subscribe(value => console.log('gameState: ', value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfPasswordIncludesSelectedLetter(changes);
  }

  generateRandomPassword(): void {
    const randomIndex = Math.floor(Math.random() * this.passwordsList.length);
    this.currentPassword = this.passwordsList[randomIndex].toUpperCase();
    this.counterService.currentPassword.next(this.currentPassword);
  }

  checkIfPasswordIncludesSelectedLetter(changes: SimpleChanges): void {
    const selectedLetter = changes.clickedLetter.currentValue;
    if (changes.clickedLetter.currentValue && this.currentPassword.split('').includes(selectedLetter)) {
      for (let i = 0;  i < this.currentPassword.length; i++) {
        if (this.currentPassword.split('')[i] === selectedLetter) {
          this.updateHiddenPassword(selectedLetter, i);
        }
      }
      if (this.checkIfHiddenPasswordEqualsCurrentPassword()) {
        this.updateGameState(GameStateEnum.SUCCESS);
        this.router.navigate(['/win']);
      }
    } else if (changes.clickedLetter.currentValue && !this.currentPassword.split('').includes(selectedLetter)) {
      this.updateMissedGuessesCounterValue();
      if (!this.checkIfAnyGuessesLeft()) {
        this.updateGameState(GameStateEnum.FAILURE);
        this.router.navigate(['/game-over']);
      }
    }
  }

  updateHiddenPassword(selectedLetter: string, index: number): void {
    document.querySelector('.unknown-letter' + index).innerHTML = selectedLetter;
    this.hiddenPassword[index] = selectedLetter;
  }

  updateMissedGuessesCounterValue(): void {
    this.counterService.missedGuessesCounterValue += 1;
  }

  checkIfHiddenPasswordEqualsCurrentPassword(): boolean {
    return this.hiddenPassword.join('') === this.currentPassword;
  }

  checkIfAnyGuessesLeft(): boolean {
    return this.counterService.missedGuessesCounterValue < this.counterService.maxGuessesNumber;
  }

  updateGameState(state: GameStateEnum.PENDING | GameStateEnum.SUCCESS | GameStateEnum.FAILURE): void {
    this.counterService.gameState.next(state);
  }

}
