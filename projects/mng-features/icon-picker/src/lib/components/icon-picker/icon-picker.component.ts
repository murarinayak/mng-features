import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOption } from 'mng-features/shared';
import { MNGIconPickerService } from '../../icon-picker.service';
import { IconPaletteComponent } from '../icon-palette/icon-palette.component';

@Component({
  selector: 'mng-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class MNGIconPickerComponent {

  @Input() label = 'Icon';
  @Input() selection = 'home';
  @Input() icons: Array<IOption> = [];

  @Output() onSelection = new EventEmitter<string>();

  show = false;
  
  constructor(
    private dialog: Dialog,
    private iconService: MNGIconPickerService,
  ) {}

  ngOnInit() {
    this.iconService.getIcons().subscribe(response => {
      this.icons = response ?? [];
    });
  }

  onClick() {
    console.log('clicked');
    this.show = !this.show;
  }

  onIconClick(icon: IOption) {
    this.selection = icon.value.toString();
    this.show = false;
    this.onSelection.emit(this.selection);
  }

  onToggleClick() {
    this.show = !this.show;
    if (this.show) {
      const dialogRef = this.dialog.open<string>(IconPaletteComponent, {
        // width: '300px',
        data: { name: 'this.name', animal: 'this.animal' },
      });

      dialogRef.closed.subscribe(result => {
        console.log('The dialog was closed', result);
        this.selection = result;
        this.show = false;
        this.onSelection.emit(this.selection);
      });
    }
  }
}
