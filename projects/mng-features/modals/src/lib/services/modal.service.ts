import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<unknown>, config?: MatDialogConfig<any>) {
    return this.dialog.open(component, config);
  }
}
