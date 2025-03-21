import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../common/dialog-data.model';

@Component({
  selector: 'mng-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
  standalone: false
})
export class AlertModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) { }

  onOkClick() {
    this.dialogRef.close();
  }
}
