import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
