import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MidDetailDialogModel } from './mid-detail-dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'fury-mid-detail-dialog',
  templateUrl: './mid-detail-dialog.component.html',
  styleUrls: ['./mid-detail-dialog.component.scss']
})
export class MidDetailDialogComponent implements OnInit {
  id : string;
  gateway_id : string;
  start_date : string;
  end_date : string;
  total_count : number;
  status : number;
  endPoint = '';
  filters = {};
  isLoading = true;
  details = [];

  constructor(public dialogRef: MatDialogRef<MidDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MidDetailDialogModel) {
      this.gateway_id = data.gateway_id;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.total_count = data.total_count;
      this.status = data.status;
      this.endPoint = environment.endpoint;
  }

  ngOnInit(): void {
    const response = fetch(`${this.endPoint}/api/get_mid_count_detail?gateway_id=${this.gateway_id}&start_date=${this.start_date}&end_date=${this.end_date}&total_count=${this.total_count}&status=${this.status}`).then(res => res.json()).then((data) => {
      this.isLoading = false;
      if(data.status){
        this.details = data.data;
        this.isLoading = false;
      }
    });
  }

  onConfirm(): void {
    
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
  selection(data){
  }
}
