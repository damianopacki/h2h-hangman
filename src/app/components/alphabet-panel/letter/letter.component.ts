import { Component, Input, OnInit } from '@angular/core';
import { GuessStateEnum } from 'src/app/enums/guess-state.enum';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {
  @Input() letter: string;

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
  }

  updateLetterState(letter: HTMLElement): void {
    this.counterService.currentPassword.subscribe((value: string) => {
      if (value.includes(letter.innerHTML)) {
        letter.classList.add(GuessStateEnum.HIT);
      } else {
        letter.classList.add(GuessStateEnum.MISS);
      }
    });
  }

}
