import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';

@Component({
  selector: 'mng-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  standalone: false
})
export class MNGColorPickerComponent {

  @Input() label: string = 'Select Color';
  @Input() selection: string;
  @Output() onSelection = new EventEmitter<string>();

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
        this.selection = result;
        this.showModal = false;
        this.onSelection.emit(this.selection);
      });
    }
  }

  // Not req
  onSelectionChange(event: string) {
    this.selection = event;
    this.showModal = false;
  }
}
