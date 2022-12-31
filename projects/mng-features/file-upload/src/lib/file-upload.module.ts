import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [
    FileUploadComponent
  ]
})
export class MNGFileUploadModule { }
