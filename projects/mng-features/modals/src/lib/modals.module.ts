import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class MNGModalsModule { }
