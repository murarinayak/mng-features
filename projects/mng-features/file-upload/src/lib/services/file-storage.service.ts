import { Inject, Injectable } from '@angular/core';
import { UploadTask, deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BehaviorSubject, Observable, catchError, from, switchMap, throwError } from 'rxjs';

import { CollNameGlobal, CommonService, FirestoreService, FIREBASE_SERVICES, FirebaseServices } from 'mng-features/shared';
import { IUploadedFile } from '../common/common.model';


export interface IFileMetadata {
  filePath?: string;
  percent?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileStorageService extends FirestoreService<unknown> {

  private fileUpload = new BehaviorSubject<IFileMetadata>({});
  fileUpload$ = this.fileUpload.asObservable();
  
  defaultFolderPath = `${new Date().getUTCFullYear()}${('0' + (new Date().getUTCMonth() + 1)).slice(-2)}`;

  constructor(
    @Inject(FIREBASE_SERVICES) private readonly firebaseServices: FirebaseServices,
    private commonService: CommonService,
  ) {
    super(firebaseServices);
    this.collName = CollNameGlobal.UPLOADS;
  }

  uploadFileAndGetMetadata(fileToUpload: File, mediaFolderPath?: string): Observable<IFileMetadata> {
    this.fileUpload = new BehaviorSubject<IFileMetadata>({})
    this.fileUpload$ = this.fileUpload.asObservable();
    mediaFolderPath = mediaFolderPath ?? this.defaultFolderPath;
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const storageRef = ref(this.firebaseServices.storage, filePath);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, fileToUpload);
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        // console.log(percent + "% done");
        this.updateResponse({ percent, filePath });
      },
      (error) => { console.error(error); },
      () => {
        // console.log('upload complete!');
        this.createUploadRef(uploadTask.snapshot.metadata).subscribe({
          next: (responseUploadRef) => {
            // console.log('res', responseUploadRef);
            this.fileUpload.complete();
          }
        });
      }
    );
    return this.fileUpload$;
  }

  updateResponse(fileUploadResponse: IFileMetadata) {
    const updatedResponse: IFileMetadata = {
      ...this.fileUpload.getValue(),
      ...fileUploadResponse
    };
    this.fileUpload.next(updatedResponse);
  }

  createUploadRef(fileMetadata: any) {
    // console.log('meta', fileMetadata);
    const item: IUploadedFile = {
      ...this.commonService.getDefaultDoc(),
      filePath: fileMetadata.fullPath ?? '',
      contentType: fileMetadata.contentType ?? '',
    };
    // console.log('doc', item);
    return super.post(item);
  }

  getDownloadURL(filePath: string) {
    return from(getDownloadURL(ref(this.firebaseServices.storage, filePath)));
  }

  deleteFile(file: IUploadedFile) {
    const filePath = file.filePath ?? '';
    const storageRef = ref(this.firebaseServices.storage, filePath);
    return from(deleteObject(storageRef)).pipe(
      switchMap(() => super.delete(file.id)),
      catchError((error) => {
        console.error('file delete error', error);
        if (file.id && error.toString().indexOf('storage/object-not-found') !== -1) {
          return super.delete(file.id);
        }
        return throwError(() => error)
      })
    )
  }

}



