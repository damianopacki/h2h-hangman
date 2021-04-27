import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnChanges {
  @Input() clickedLetter: string;
  @Output() onMissedTry = new EventEmitter<boolean>();

  public passwordsList = ['Argentyna', 'Polska', 'Słowacja'];
  public currentPassword: string;
  public hiddenPassword: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateRandomPassword();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfPasswordIncludesSelectedLetter(changes);
  }

  generateRandomPassword(): void {
    const randomIndex = Math.floor(Math.random() * this.passwordsList.length);
    this.currentPassword = this.passwordsList[randomIndex].toUpperCase();
  }

  checkIfPasswordIncludesSelectedLetter(changes: SimpleChanges): void {
    const selectedLetter = changes.clickedLetter.currentValue;
    if (changes.clickedLetter.currentValue && this.currentPassword.split('').includes(selectedLetter)) {
      for (let i = 0;  i < this.currentPassword.length; i++) {
        if (this.currentPassword.split('')[i] === selectedLetter) {
          this.updateHiddenPassword(selectedLetter, i);
        } else {
          this.emitMiss();
        }
      }
    }
  }

  updateHiddenPassword(selectedLetter: string, index: number): void {
    document.querySelector('.unknown-letter' + index).innerHTML = selectedLetter;
    this.hiddenPassword[index] = selectedLetter;
  }

  emitMiss(): void {
    this.onMissedTry.emit(true);
  }

}