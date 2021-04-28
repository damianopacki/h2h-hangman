import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  restartGame(): void {
    this.router.navigate(['']);
  }

}
