import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title = 'Hangman';

  constructor(private dialog: MatDialog) { }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent);
  }

}
