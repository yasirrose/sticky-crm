import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevenueDialogModel } from './revenue-dialog.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'fury-revenue-dialog',
  templateUrl: './revenue-dialog.component.html',
  styleUrls: ['./revenue-dialog.component.scss']
})
export class RevenueDialogComponent implements OnInit {

  title: string;
  message: string;
  mid: any;
  endPoint = '';
  rows: [];
  id: number;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<RevenueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RevenueDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.id = data.mid.id;
    this.endPoint = environment.endpoint;
  }

  ngOnInit(): void {
    this.isLoading = true;
    const response = fetch(`${this.endPoint}/api/mids_order_total/${this.id}`).then(res => res.json()).then((data) => {
      if (data.status) {
        this.isLoading = false;
        this.mid = data.data;
      }
    });
  }
  onConfirm(): void {
    // this.dialogRef.close(this.selectedGroup);
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
