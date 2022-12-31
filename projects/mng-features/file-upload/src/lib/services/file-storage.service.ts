import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { CollName, CommonService } from 'mng-features/shared';
import { IUploadedFile } from '../common/common.model';

export interface IFileMetadata {
  filePath: string;
  snapshotChanges$: Observable<UploadTaskSnapshot>;
  uploadProgress$: Observable<number>;
  // downloadUrl$: Observable<string>;
  metadata$: Observable<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  // defaultFolderPath = `${new Date().getUTCFullYear()}${('0' + (new Date().getUTCMonth() + 1)).slice(-2)}${('0' + new Date().getUTCDate()).slice(-2)}`;
  defaultFolderPath = `${new Date().getUTCFullYear()}${('0' + (new Date().getUTCMonth() + 1)).slice(-2)}`;

  constructor(
    private readonly afStorage: AngularFireStorage,
    private ngFirestore: AngularFirestore,
    private commonService: CommonService,
  ) { }

  uploadFileAndGetMetadata(fileToUpload: File, mediaFolderPath?: string): IFileMetadata {
    mediaFolderPath = mediaFolderPath ?? this.defaultFolderPath;
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.afStorage.upload(filePath, fileToUpload);
    const metadata$ = from(uploadTask).pipe(
      switchMap(() => this.afStorage.ref(filePath).getMetadata()),
      switchMap((metadata: any) => this.createUploadRef(metadata))
    );
    return {
      filePath,
      snapshotChanges$: uploadTask.snapshotChanges(),
      uploadProgress$: uploadTask.percentageChanges(),
      // downloadUrl$: from(uploadTask).pipe(switchMap((_) => this.afStorage.ref(filePath).getDownloadURL())),
      metadata$
    };
  }

  createUploadRef(fileMetadata: any) {
    const document: IUploadedFile = {
      // uid: this.authService.getAuthUser().user.uid,
      // uid: this.authService.getUID(),
      ...this.commonService.getDefaultDoc(),
      filePath: fileMetadata.fullPath ?? '',
      contentType: fileMetadata.contentType ?? '',
      // dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    }
    return of(this.ngFirestore.collection(CollName.UPLOADS).add(document)).pipe(
      // switchMap(() => of(fileMetadata))
    );
  }

  deleteFile(file: IUploadedFile) {
    const filePath = file.filePath ?? '';
    // const basePath = filePath.slice(0, filePath.lastIndexOf('/'));
    // const fileName = filePath.slice(filePath.lastIndexOf('/'));
    return this.afStorage.ref(filePath).delete().pipe(
      switchMap(() => this.deleteUploadedFileRef(file.id)),
      catchError((error) => {
        console.log('er1', error);
        if (file.id && error.toString().indexOf('storage/object-not-found') !== -1) {
          return this.deleteUploadedFileRef(file.id);
        }
        return throwError(() => error)
      })
    );
  }

  deleteUploadedFileRef(id: string) {
    return this.ngFirestore.collection(CollName.UPLOADS).doc(id).delete();
  }

  getDownloadURL(filePath: string) {
    return this.afStorage.ref(filePath).getDownloadURL();
  }

  /**
   * Be very stringent with firing the next 2 APIs, as this might consume a lot of resources
   * @param folderPath Path to find all file references from FileStorage
   * @returns 
   */
  list(folderPath: string) {
    return of(this.afStorage.storage.ref(folderPath).list());
  }
  listAll(folderPath: string) {
    return of(this.afStorage.storage.ref(folderPath).listAll());
  }



}
