import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'h2h-hangman';
  clickedLetter: string;

  checkLetter(letter: string): void {
    console.log('no leci sobie letter', letter);
    this.clickedLetter = letter;
  }
}
