import { Inject, Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { from, map } from 'rxjs';

import { FIREBASE_SERVICES, FirebaseServices } from './firebase-services';
import { IAudioRequest } from '../models/global.model';

@Injectable()
export class M2NTextToSpeechService {

  constructor(@Inject(FIREBASE_SERVICES) private readonly firebaseServices: FirebaseServices) {}

  getAudio(docID: string, text: string, languageCode?: string, voiceName?: string) {
    // connectFunctionsEmulator(this.fns, "127.0.0.1", 5001);
    const request: IAudioRequest = { docID, input: { text }, voice: { languageCode, name: voiceName } };
    const functions = this.firebaseServices.functions;
    if (!functions) {
      throw new Error('Firebase Functions service is not available');
    }
    return null;
    // return from(httpsCallable<IAudioRequest, string>(functions, 'textToSpeech')(request)).pipe(
    //   map((response: string) => {
    //     // console.log('txt2speech', response);
    //     return response;
    //   })
    // );
    // const options: HttpsCallableOptions = { }
    // from(httpsCallable(this.fns, '')(request)).pipe({
    //   response => {
    //   }
    // })
  }
}