import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'app-gallows',
  templateUrl: './gallows.component.html',
  styleUrls: ['./gallows.component.scss']
})
export class GallowsComponent implements OnInit, OnDestroy {
  public imageSource = '../../../assets/s0.jpg';
  public maxGuessesNumber: number;
  private subscriptions$ = new Subscription();

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.getMaxGuessesNumber();
    this.getGuessesCount();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  getGuessesCount(): void {
    this.subscriptions$.add(
      this.counterService.missedGuessesCounter.subscribe((value: number) => {
        this.getProperGallowsImageSource(value);
      })
    );
  }

  getMaxGuessesNumber(): void {
    this.maxGuessesNumber = this.counterService.maxGuessesNumber;
  }

  getProperGallowsImageSource(value: number): void {
    if (value <= this.maxGuessesNumber) {
      this.imageSource = `../../../assets/s${value}.jpg`;
    }
  }

}
