import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionDialogModel } from './action-dialog.model';

@Component({
  selector: 'fury-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent {

  action: string;
  local_data: any;
  title: string;
  message: string;
  groupName: string;
  bankPercentage: string;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ActionDialogModel) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.title = data.title;
    this.message = data.message;
    this.groupName = data.group_name;
    this.bankPercentage = data.bank_per;
  }

  doAction() {
    var data: {};
    data = {
      'id': this.local_data.id,
      'group_name': this.groupName,
      'bank_per': this.bankPercentage
    };
    this.dialogRef.close({ event: this.action, data: data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
