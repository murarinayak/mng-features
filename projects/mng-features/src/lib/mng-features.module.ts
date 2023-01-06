import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ILibraryConfig } from 'mng-features/shared';
import { MNGFeaturesComponent } from './mng-features.component';

@NgModule({
  declarations: [
    MNGFeaturesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MNGFeaturesComponent,
  ]
})
export class MNGFeaturesModule {
  public static forRoot(config: ILibraryConfig): ModuleWithProviders<MNGFeaturesModule> {
    return {
      ngModule: MNGFeaturesModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}
