import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { COLORS_DEFAULT } from '../../common/color-picker.constants';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'mng-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent {

  @Input() colorList: string[] = COLORS_DEFAULT;

  // @Output() selection = new EventEmitter<string>();

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: string) { } // DialogData
  // constructor() {}

  changeColor(color: string) {
    this.data = color;
    this.dialogRef.close(color ?? this.data);
    // this.selection.next(color);
  }
}
