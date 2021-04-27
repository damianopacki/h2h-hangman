import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title = 'Hangman';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent);
  }

}
