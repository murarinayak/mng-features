import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MNGColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerDirective } from './color-picker.directive';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { MNGColorPickerComponent1 } from './components/color-picker-1/color-picker.component';

@NgModule({
  declarations: [
    MNGColorPickerComponent,
    MNGColorPickerComponent1,
    ColorPickerDirective,
    ColorPaletteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatCardModule,
    MatButtonModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    OverlayModule,
  ],
  exports: [
    MNGColorPickerComponent,
  ],
  // entryComponents: [
  //   // NgxMatColorPickerContentComponent
  // ],
  providers: [
    // ColorAdapter,
    // NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
  ]
})
export class MNGColorPickerModule { }
