
import { Directive, HostListener } from '@angular/core';
import { NUMERIC_REGEX } from '../common/color-picker.helper';

@Directive({
  selector: '[mngColorPicker]'
})
export class MNGColorPickerDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    this._formatInput($event.target);
  }

  /**
   * Format input
   * @param input any
   */
  private _formatInput(input: any) {
    let val = Number(input.value.replace(NUMERIC_REGEX, ''));
    val = isNaN(val) ? 0 : val;
    input.value = val;
  }

}
