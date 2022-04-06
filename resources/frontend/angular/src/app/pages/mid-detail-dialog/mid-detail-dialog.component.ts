import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MidDetailDialogModel } from './mid-detail-dialog';

@Component({
  selector: 'fury-mid-detail-dialog',
  templateUrl: './mid-detail-dialog.component.html',
  styleUrls: ['./mid-detail-dialog.component.scss']
})
export class MidDetailDialogComponent {
  id : string;
  constructor(public dialogRef: MatDialogRef<MidDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MidDetailDialogModel) {
      this.id = data.id;
    }

  ngOnInit(): void {
  }

}
