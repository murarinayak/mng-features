import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { FileStorageService } from '../services/file-storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() uploadComplete: EventEmitter<boolean> = new EventEmitter();

  uploadProgress$: Observable<number>;
  metadata$: Observable<unknown>;
  uploadInProgress = false;

  constructor(
    private fileStorageService: FileStorageService,
  ) { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    this.uploadInProgress = true;
    const file = event.target.files[0];
    const { filePath, snapshotChanges$, uploadProgress$, metadata$ } = this.fileStorageService.uploadFileAndGetMetadata(file);
    this.uploadProgress$ = uploadProgress$;
    // this.metadata$ = metadata$;
    // snapshotChanges$.subscribe(
    //   (snapshot: UploadTaskSnapshot) => {
    //     // console.log('d', snapshot);
    //   },
    //   (error) => {
    //     // this.toastService.setMessage(new ToastMessage('Error' + JSON.stringify(error)))
    //     console.log('err', error);
    //   },
    //   () => {
    //     // this.toastService.setMessage(new ToastMessage('Upload Complete'));
    //     this.fileStorageService.createUploadRef(filePath);
    //   }
    // );
    metadata$.pipe(
      // switchMap((metadata: unknown) => {
      //   console.log('met', metadata);
      //   return this.fileStorageService.createUploadRef(filePath);
      // })
    ).subscribe(
      (res) => {
        // console.log('met', res);
        this.uploadInProgress = false;
        this.uploadComplete.next(true);
      }
    );
  }

}
