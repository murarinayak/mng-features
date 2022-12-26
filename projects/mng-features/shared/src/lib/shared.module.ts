import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirestoreDatePipe } from './pipes/firestore-date.pipe';

@NgModule({
  declarations: [
    FirestoreDatePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FirestoreDatePipe,
  ]
})
export class SharedModule { }