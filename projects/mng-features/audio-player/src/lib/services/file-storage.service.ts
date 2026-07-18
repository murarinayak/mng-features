import { Inject, Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';

import { CollNameGlobal, CommonService, FIREBASE_SERVICES, FirebaseServices } from 'mng-features/shared';
import { IUploadedFile } from 'mng-features/file-upload';

export interface IFileMetadata {
  filePath: string;
  snapshotChanges$: Observable<unknown>;
  uploadProgress$: Observable<number>;
  metadata$: Observable<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  // defaultFolderPath = `${new Date().getUTCFullYear()}${('0' + (new Date().getUTCMonth() + 1)).slice(-2)}${('0' + new Date().getUTCDate()).slice(-2)}`;
  defaultFolderPath = `${new Date().getUTCFullYear()}${('0' + (new Date().getUTCMonth() + 1)).slice(-2)}`;

  constructor(
    @Inject(FIREBASE_SERVICES) private readonly firebaseServices: FirebaseServices,
    private commonService: CommonService,
  ) { }

  private get storage() {
    if (!this.firebaseServices.storage) {
      throw new Error('Firebase Storage service is not available');
    }
    return this.firebaseServices.storage;
  }

  private get firestore() {
    if (!this.firebaseServices.firestore) {
      throw new Error('Firebase Firestore service is not available');
    }
    return this.firebaseServices.firestore;
  }

  uploadFileAndGetMetadata(fileToUpload: File, mediaFolderPath?: string): IFileMetadata {
    mediaFolderPath = mediaFolderPath ?? this.defaultFolderPath;
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);
    const metadata$ = from(Promise.resolve(uploadTask)).pipe(
      switchMap(() => from(getDownloadURL(storageRef))),
      switchMap((downloadUrl: string) => this.createUploadRef({ fullPath: filePath, contentType: fileToUpload.type, downloadUrl }))
    );
    return {
      filePath,
      snapshotChanges$: of(uploadTask.snapshot as UploadTaskSnapshot),
      uploadProgress$: new Observable<number>((observer) => {
        uploadTask.on('state_changed', (snapshot) => {
          observer.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, (error) => observer.error(error), () => observer.complete());
      }),
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
    return from(addDoc(collection(this.firestore, CollNameGlobal.UPLOADS), document)).pipe(
      // switchMap(() => of(fileMetadata))
    );
  }

  deleteFile(file: IUploadedFile) {
    const filePath = file.filePath ?? '';
    // const basePath = filePath.slice(0, filePath.lastIndexOf('/'));
    // const fileName = filePath.slice(filePath.lastIndexOf('/'));
    return from(deleteObject(ref(this.storage, filePath))).pipe(
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
    return from(deleteDoc(doc(this.firestore, `${CollNameGlobal.UPLOADS}/${id}`)));
  }

  getDownloadURL(filePath: string) {
    return from(getDownloadURL(ref(this.storage, filePath)));
  }

  /**
   * Be very stringent with firing the next 2 APIs, as this might consume a lot of resources
   * @param folderPath Path to find all file references from FileStorage
   * @returns 
   */
  list(folderPath: string) {
    return of(this.storage).pipe(
      switchMap(() => of(undefined))
    );
  }
  listAll(folderPath: string) {
    return of(this.storage).pipe(
      switchMap(() => of(undefined))
    );
  }



}
