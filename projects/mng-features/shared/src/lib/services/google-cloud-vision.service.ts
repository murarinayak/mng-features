import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Observable, map } from 'rxjs';

import { CommonService } from './common.service';
import { IGoogleVisionResponse } from '../models/cloud-vision.model';

@Injectable()
export class GoogleCloudVisionService {
  constructor(
    private functions: Functions,
    private commonService: CommonService,
  ) { }

  processImage(storageFileName: string): Observable<string> {
    const url = `gs://${this.commonService.getFirebaseConfig().storageBucket}/${storageFileName}`;
    const request: string = url;
    return httpsCallableData(this.functions, 'annotateImage')(request).pipe(
      map((response: IGoogleVisionResponse) => {
        // console.log('callable', response);
        return response?.fullTextAnnotation?.text ?? '';
      })
    );

    // httpsCallable returns the exact same response inside a 'data' attribute
    // return from(httpsCallable(this.functions, 'annotateImage')(request)).pipe(
    //   map((response: HttpsCallableResult<IGoogleVisionResponse>) => {
    //     // console.log('callable', response);
    //     return response!.data!.fullTextAnnotation!.text ?? '';
    //   })
    // );
  }

}

// import { AngularFireFunctions } from '@angular/fire/compat/functions';
// import { map, Observable } from 'rxjs';
// import { CommonService } from './common.service';

// @Injectable()
// export class GoogleCloudVisionService {

//   constructor(
//     // private functions: Functions,
//     private fns: AngularFireFunctions,
//     private commonService: CommonService,
//   ) { }

//   processImage(storageFileName: string): Observable<string> {
//     const url = `gs://${this.commonService.getFirebaseConfig().storageBucket}/${storageFileName}`;
//     // const request: IGoogleVisionRequest = { url };
//     const request: string = url;
//     // return httpsCallableData<string, IGoogleVisionResponse>(this.functions, 'annotateImageCall')(request).pipe(
//     return this.fns.httpsCallable('annotateImage')(request).pipe(
//       map((response: IGoogleVisionResponse) => {
//         // console.log('callable', response);
//         return response?.fullTextAnnotation?.text ?? '';
//       })
//     );
//   }

//   // processImage1(storageFileName: string): Observable<string> {
//   //   const apiURL = '/annotateImage';
//   //   const url = `gs://${environment.firebase.storageBucket}/${storageFileName}`;
//   //   return this.httpClient.post<IGoogleVisionResponse>(apiURL, { url }).pipe(
//   //     map((response: IGoogleVisionResponse) => {
//   //       return response?.fullTextAnnotation?.text ?? '';
//   //     })
//   //   );
//   // }

//   // getAudio(docID: string, text: string) {
//   //   // text = 'This is a test story designed to test the audio output of the story.';
//   //   const request: IAudioRequest = { docID, text };
//   //   // return httpsCallableData<IAudioRequest, string>(this.functions, 'textToSpeech')(request).pipe(
//   //   return this.fns.httpsCallable('textToSpeech')(request).pipe(
//   //     map((response: string) => {
//   //       // console.log('txt2speech', response);
//   //       return response;
//   //     })
//   //   );
//   // }
// }
