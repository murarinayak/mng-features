import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMenuItem } from 'mng-features/shared';
import { IDragDropItem } from '../../common/drag-drop-item.model';

@Component({
  selector: 'mng-drag-drop-item',
  templateUrl: './drag-drop-item.component.html',
  styleUrls: ['./drag-drop-item.component.css']
})
export class DragDropItemComponent {

  @Input() item: IDragDropItem;
  @Input() rowLabel = 'Row Label';
  // @Input() rowData: IDragDropItem;
  @Input() expanded = false;
  @Input() showToggle = false;
  // @Input() showFlyoutMenu = false;
  // @Input() flyoutMenu;
  @Input() rowExpansionCondition: (rowData: unknown) => boolean;

  @Output() toggle = new EventEmitter<boolean>();

  expand() { this.toggleBlock(true); }
  collapse() { this.toggleBlock(false); }

  toggleBlock(expanded: boolean) {
    // if (this.item.canToggle) {
    this.expanded = expanded;
    this.toggle.emit(this.expanded);
    // }
  }

  onActionItemClick(item: IMenuItem) {
    console.log('iii', item);
    if (item.onClick) {
      item.onClick();
    }
  }
}
