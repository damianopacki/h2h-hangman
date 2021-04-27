import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) { }

  ngOnInit(): void {
  }

}
