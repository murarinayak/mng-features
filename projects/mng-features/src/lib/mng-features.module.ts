import { ModuleWithProviders, NgModule } from '@angular/core';
import { MNGFeaturesComponent } from './mng-features.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CommonModule } from '@angular/common';

interface ILibraryConfig {
  environment: any;
}

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
export class MNGFeaturesModule {
  public static forRoot(config: ILibraryConfig): ModuleWithProviders<MNGFeaturesModule> {
    return {
      ngModule: MNGFeaturesModule,
      providers: [
        // ImageService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: config.environment
        }
      ]
    };
  }
}
