import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOption } from 'mng-features/shared';
import { MNGIconPickerService } from '../icon-picker.service';

@Component({
  selector: 'mng-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class MNGIconPickerComponent {

  @Input() header = 'Icon';
  @Input() selection = 'home';
  @Input() icons: Array<IOption> = [];

  @Output() onSelection = new EventEmitter<string>();

  show = false;
  
  constructor(
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
    this.selection = icon.value;
    this.show = false;
    this.onSelection.emit(this.selection);
  }
}
