import { Component, Inject } from '@angular/core';

import { MNGIconPickerService } from '../../icon-picker.service';

import { IOption } from 'mng-features/shared';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'mng-icon-palette',
  templateUrl: './icon-palette.component.html',
  styleUrls: ['./icon-palette.component.css']
})
export class IconPaletteComponent {

  items: Array<IOption> = [];

  constructor(
    public dialogRef: DialogRef<string>, 
    @Inject(DIALOG_DATA) public data: string,
    private iconService: MNGIconPickerService,
  ) { } // DialogData

  ngOnInit() {
    this.iconService.getIcons().subscribe(response => {
      this.items = response ?? [];
    });
  }

  onClick(item: IOption) {
    this.data = item.value;
    this.dialogRef.close(this.data);
  }
}
