import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {
  clickedLetter: string;

  checkLetter(letter: string): void {
    this.clickedLetter = letter;
  }

}
