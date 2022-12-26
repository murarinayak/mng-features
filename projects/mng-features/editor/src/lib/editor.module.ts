import { NgModule } from '@angular/core';
// import { QuillModule } from 'ngx-quill';

import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    // QuillModule.forRoot(),?
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
