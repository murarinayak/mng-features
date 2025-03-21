import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild
} from '@angular/core';

import { FileStorageService, IFileMetadata } from '../services/file-storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: false
})
export class FileUploadComponent {

  @ViewChild('inputFile') inputFile: ElementRef;

  @Output() uploadComplete: EventEmitter<IFileMetadata> = new EventEmitter();

  uploadInProgress = false;
  progress = 0;
  fileMetadata: IFileMetadata;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fileStorageService: FileStorageService,
  ) { }

  uploadFile(event) {
    this.uploadInProgress = true;
    this.progress = 0;
    const file = event.target.files[0];
    this.fileStorageService.uploadFileAndGetMetadata(file).subscribe({
      next: (response: IFileMetadata) => {
        console.log('uf', response);
        this.fileMetadata = response;
        this.progress = this.fileMetadata!.percent;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        alert(JSON.stringify(error));
      },
      complete: () => {
        this.uploadInProgress = false;
        this.uploadComplete.next(this.fileMetadata);
        this.inputFile.nativeElement.value = '';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

}
