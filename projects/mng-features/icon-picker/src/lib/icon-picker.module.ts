import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MNGIconPickerComponent } from './icon-picker/icon-picker.component';

@NgModule({
  declarations: [
    MNGIconPickerComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],
  exports: [
    MNGIconPickerComponent,
  ]
})
export class MNGIconPickerModule { }
