import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {DialogModule} from '@angular/cdk/dialog';
// import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';

import { MNGIconPickerComponent } from './components/icon-picker/icon-picker.component';
import { IconPaletteComponent } from './components/icon-palette/icon-palette.component';

@NgModule({
  declarations: [
    MNGIconPickerComponent,
    IconPaletteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [
    MNGIconPickerComponent,
  ]
})
export class MNGIconPickerModule { }
