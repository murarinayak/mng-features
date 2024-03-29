import { Injectable } from '@angular/core';

import { ColorInputFormat, stringInputToObject } from '../common/color-picker.helper';
import { Color } from '../common/color.model';

@Injectable()
export class ColorAdapter {

  constructor() { }

  sameColor(a: Color, b: Color) {
    if (a == null && b == null) return true;
    if (a != null && b != null) return a.rgba === b.rgba;
    return false;
  }

  format(c: Color, format: ColorInputFormat): string {
    return c.toString(format);
  }

  parse(value: string): Color | null {
    const obj = stringInputToObject(value);
    if (obj) {
      return new Color(obj.r, obj.g, obj.b, obj.a);
    }
    return null;
  }

}