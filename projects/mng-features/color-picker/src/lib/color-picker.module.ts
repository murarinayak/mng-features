import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MNGColorPickerComponent } from './components/color-picker/color-picker.component';
import { NgxMatColorToggleComponent } from './components/color-toggle/color-toggle.component';
import { NgxMatColorPickerComponent, NgxMatColorPickerContentComponent } from './components/ngx-color-picker/ngx-color-picker.component';
import { NgxMatColorCanvasComponent } from './components/color-canvas/color-canvas.component';
import { NgxMatColorSliderComponent } from './components/color-slider/color-slider.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatColorCollectionComponent } from './components/color-collection/color-collection.component';
import { NgxMatColorPaletteComponent } from './components/color-palette/color-palette.component';

@NgModule({
  declarations: [
    MNGColorPickerComponent,
    NgxMatColorToggleComponent,
    NgxMatColorPickerComponent,
    NgxMatColorPaletteComponent,
    NgxMatColorCanvasComponent,
    NgxMatColorCollectionComponent,
    NgxMatColorSliderComponent,
    NgxMatColorPickerContentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MatCardModule,
    // MatButtonModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    MNGColorPickerComponent,
  ]
})
export class MNGColorPickerModule { }
