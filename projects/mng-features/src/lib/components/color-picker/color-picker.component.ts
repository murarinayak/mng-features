import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mng-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {

  @Input() heading: string = 'Primary Color';
  @Input() selectedColor: string = '#FFFFFF';
  @Output() event = new EventEmitter();

  @Input() colorList: string[] = [
    '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582',
    '#b7d5c4', '#bcd6e7', '#7c90c1', '#9d8594', '#dad0d8',
    '#4b4fce', '#4e0a77', '#a367b5', '#ee3e6d', '#d63d62',
    '#c6a670', '#f46600', '#cf0500', '#efabbd', '#8e0622',
    '#f0b89a', '#f0ca68', '#62382f', '#c97545', '#c1800b'
  ];

  public show = false;

  constructor() { }

  /**
   * Change status of visibility to color picker
   */
  public toggleColors() {
    this.show = !this.show;
  }

  public changeColor(color: string) {
    this.selectedColor = color;
    this.event.emit(this.selectedColor); // Return color
    this.show = false;
  }

  public changeColorManual(color: string) {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.selectedColor = color;
      this.event.emit(this.selectedColor); // Return color
    }
  }
}
