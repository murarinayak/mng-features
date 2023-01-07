import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { IDragDropItem } from '../../common/drag-drop-item.model';

@Component({
  selector: 'mng-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent {

  @Input() items: Array<IDragDropItem> = [
    {
      label: 'Item 1', canToggle: true, expandedList: [
        { label: 'Item 1-1' },
        { label: 'Item 1-2' },
      ]
    },
    { label: 'Item 2' },
  ];
  @Input() dropListID: string = 'drop-list-id-' + Math.round(Math.random() * 1000);
  @Input() connectedTo: Array<string> = [];
  @Input() className: string = '';
  @Input() sortingDisabled = false;
  @Input() showExpansionControls = false;
  @Input() templateCustom: TemplateRef<unknown>;
  @Input() templateExpansion: TemplateRef<unknown>;

  @Output() dragStart = new EventEmitter();
  @Output() itemDrop = new EventEmitter();
  @Output() toggle = new EventEmitter();

  expandAll() {
    console.log('expand all');
  }

  collapseAll() {
    console.log('collapse all');
  }

  onDrop(event) {
    this.itemDrop.emit(event);
  }
}
