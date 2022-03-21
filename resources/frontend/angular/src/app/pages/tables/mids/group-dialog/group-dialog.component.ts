import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupDialogModel } from './group-dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'fury-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  title: string;
  message: string;
  groups = [];
  endPoint = '';
  selectedGroup: '';
  rows: [];

  constructor(public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.endPoint = environment.endpoint;
    this.rows = data.selectedRows;
  }

  ngOnInit(): void {
    const response = fetch(`${this.endPoint}/api/mid_group_names`).then(res => res.json()).then((data) => {
      if(data.status){
        this.groups = data.data;
      }
    });
  }
  onConfirm(): void {
    this.dialogRef.close(this.selectedGroup);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
  selection(data){
  }
}
