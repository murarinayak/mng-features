import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDialogData } from '../../common/dialog-data.model';

@Component({
  selector: 'mng-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  strDefTitle: string = 'Confirm';
  strDefContent: string = 'Are you sure?';
  strDefYesBtn: string = 'Ok';
  strDefNoBtn: string = 'Cancel';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) { }

  onYesClick() {
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}
