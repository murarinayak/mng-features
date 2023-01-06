import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';

@Component({
  selector: 'mng-color-picker-2',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class MNGColorPickerComponent {
  value: string;
  showModal = false;

  constructor(private dialog: Dialog) { }

  onToggleClick() {
    this.showModal = !this.showModal;
    if (this.showModal) {
      const dialogRef = this.dialog.open<string>(ColorPaletteComponent, {
        // width: '300px',
        data: { name: 'this.name', animal: 'this.animal' },
      });

      dialogRef.closed.subscribe(result => {
        console.log('The dialog was closed', result);
        this.value = result;
        this.showModal = false;
      });
    }
  }

  onSelection(event: string) {
    this.value = event;
    this.showModal = false;
  }
}
