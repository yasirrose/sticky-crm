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
  mid_count : number;
  endPoint = '';
  filters = {};
  isLoading = false;
  details = [];

  constructor(public dialogRef: MatDialogRef<MidDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MidDetailDialogModel) {
      this.gateway_id = data.gateway_id;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.mid_count = data.mid_count;
      this.endPoint = environment.endpoint;
  }

  ngOnInit(): void {
    const response = fetch(`${this.endPoint}/api/get_mid_count_detail?gateway_id=${this.gateway_id}&start_date=${this.start_date}&end_date=${this.end_date}&mid_count=${this.mid_count}`).then(res => res.json()).then((data) => {
      if(data.status){
        this.details = data.data;
        this.isLoading = true;
        console.log('Details :',this.details)
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
