import { NgModule } from '@angular/core';
import { MNGFeaturesComponent } from './mng-features.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MNGFeaturesComponent,
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MNGFeaturesComponent,
    ColorPickerComponent,
  ]
})
export class MNGFeaturesModule { }
