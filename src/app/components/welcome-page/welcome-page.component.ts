import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(
    private router: Router,
    private counterService: CounterService) { }

  startGame(): void {
    this.counterService.startTimer();
    this.router.navigate(['game']);
  }

}
