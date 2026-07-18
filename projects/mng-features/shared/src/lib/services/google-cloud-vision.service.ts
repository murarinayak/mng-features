import { Inject, Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { Observable, from, map } from 'rxjs';

import { FIREBASE_SERVICES, FirebaseServices } from './firebase-services';

import { CommonService } from './common.service';
import { IGoogleVisionResponse } from '../models/cloud-vision.model';

@Injectable()
export class GoogleCloudVisionService {
  constructor(
    // @Inject(FIREBASE_SERVICES) private readonly firebaseServices: FirebaseServices,
    private commonService: CommonService,
  ) { }

  processImage(storageFileName: string): Observable<string> {
    const url = `gs://${this.commonService.getFirebaseConfig().storageBucket}/${storageFileName}`;
    const request: string = url;
    return null;
    // const functions = this.firebaseServices.functions;
    // if (!functions) {
    //   throw new Error('Firebase Functions service is not available');
    // }
    // return from(httpsCallable(functions, 'annotateImage')(request)).pipe(
    //   map((response: IGoogleVisionResponse) => {
    //     // console.log('callable', response);
    //     return response?.fullTextAnnotation?.text ?? '';
    //   })
    // );

    // httpsCallable returns the exact same response inside a 'data' attribute
    // return from(httpsCallable(this.functions, 'annotateImage')(request)).pipe(
    //   map((response: HttpsCallableResult<IGoogleVisionResponse>) => {
    //     // console.log('callable', response);
    //     return response!.data!.fullTextAnnotation!.text ?? '';
    //   })
    // );
  }

}

