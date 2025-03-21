import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COLORS_DEFAULT } from '../../common/color-picker.constants';

@Component({
  selector: 'mng-color-picker-1',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  standalone: false
})
export class MNGColorPickerComponent1 {

  @Input() heading: string = 'Primary Color';
  @Input() selection: string = '#FFFFFF';

  @Output() onSelection = new EventEmitter();

  @Input() colorList: string[] = COLORS_DEFAULT;

  public show = false;

  constructor() { }

  /**
   * Change status of visibility to color picker
   */
  public toggleColors() {
    this.show = !this.show;
  }

  public changeColor(color: string) {
    this.selection = color;
    this.onSelection.emit(this.selection); // Return color
    this.show = false;
  }

  public changeColorManual(color: string) {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.selection = color;
      this.onSelection.emit(this.selection); // Return color
    }
  }
}
