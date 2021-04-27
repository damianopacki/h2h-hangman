import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet-panel',
  templateUrl: './alphabet-panel.component.html',
  styleUrls: ['./alphabet-panel.component.scss']
})
export class AlphabetPanelComponent implements OnInit {
  @Output() onLetterClick = new EventEmitter<string>();

  public alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor() { }

  ngOnInit(): void {
  }

  checkLetter(letter: string): void {
    console.log('letter: ', letter);
    this.onLetterClick.emit(letter);
  }

}
