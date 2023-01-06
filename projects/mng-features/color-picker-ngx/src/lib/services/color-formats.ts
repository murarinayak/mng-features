import { InjectionToken } from '@angular/core';

import { ColorInputFormat } from '../common/color-picker.helper';

export type MatColorFormats = {
  display: {
    colorInput: ColorInputFormat;
  }
}

export const NGX_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex'
  }
}

export const MAT_COLOR_FORMATS = new InjectionToken<MatColorFormats>('mat-color-formats');
