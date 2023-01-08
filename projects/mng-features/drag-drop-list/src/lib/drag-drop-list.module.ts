import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { DragDropItemComponent } from './components/drag-drop-item/drag-drop-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    DragDropListComponent,
    DragDropItemComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    DragDropListComponent,
  ]
})
export class MNGDragDropListModule { }