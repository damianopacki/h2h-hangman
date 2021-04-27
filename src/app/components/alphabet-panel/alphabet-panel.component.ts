import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabet-panel',
  templateUrl: './alphabet-panel.component.html',
  styleUrls: ['./alphabet-panel.component.scss']
})
export class AlphabetPanelComponent implements OnInit {
  public alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor() { }

  ngOnInit(): void {
  }

}
