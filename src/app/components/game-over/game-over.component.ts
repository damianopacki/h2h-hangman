import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit, OnDestroy {
  public currentAnswer: string;
  private subscription$ = new Subscription();

  constructor(
    private counterService: CounterService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCurrentPassword();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getCurrentPassword(): void {
    this.subscription$.add(
      this.counterService.currentAnswer.subscribe((value: string) => this.currentAnswer = value)
    );
  }

  restartGame(): void {
    this.router.navigate(['/game']);
    this.counterService.startTimer();
  }

}
