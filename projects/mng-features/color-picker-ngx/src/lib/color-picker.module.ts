import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NgxMatColorToggleComponent } from './components/color-toggle/color-toggle.component';
import { NgxMatColorPickerComponent, NgxMatColorPickerContentComponent, NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './components/color-picker/ngx-color-picker.component';
import { NgxMatColorCanvasComponent } from './components/color-canvas/color-canvas.component';
import { NgxMatColorSliderComponent } from './components/color-slider/color-slider.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatColorCollectionComponent } from './components/color-collection/color-collection.component';
import { NgxMatColorPaletteComponent } from './components/color-palette/color-palette.component';
import { NgxMatColorPickerInput } from './components/color-picker/color-input.component';
import { ColorAdapter } from './services/color-adapter.service';
import { NumericColorInputDirective } from './directives/numeric-color-picker.directive';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NgxMatColorToggleComponent,
    NgxMatColorPickerComponent,
    NgxMatColorPaletteComponent,
    NgxMatColorCanvasComponent,
    NgxMatColorCollectionComponent,
    NgxMatColorSliderComponent,
    NgxMatColorPickerContentComponent,
    NumericColorInputDirective,
    NgxMatColorPickerInput,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MatCardModule,
    // MatButtonModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    NgxMatColorToggleComponent,
    NgxMatColorPickerInput,
    NgxMatColorPickerComponent
  ],
  entryComponents: [
    NgxMatColorPickerContentComponent
  ],
  providers: [
    ColorAdapter,
    NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
  ]
})
export class NgxMatColorPickerModule { }
