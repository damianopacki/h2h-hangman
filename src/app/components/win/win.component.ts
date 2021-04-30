import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {
  public minutesInGame: number;
  public secondsInGame: number;

  constructor(
    private router: Router,
    private counterService: CounterService) { }

  ngOnInit(): void {
    this.getGameTime();
  }

  restartGame(): void {
    this.router.navigate(['/game']);
    this.counterService.startTimer();
    this.counterService.currentGameStageValue = 1;
  }

  getGameTime(): void {
    this.minutesInGame = Math.floor(this.counterService.gameTime / 60);
    this.secondsInGame = this.counterService.gameTime % 60;
  }

}
