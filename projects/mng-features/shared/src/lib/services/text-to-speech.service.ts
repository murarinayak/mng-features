import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { from, map } from 'rxjs';
import { IAudioRequest } from '../models/global.model';

@Injectable()
export class M2NTextToSpeechService {

  fns = inject(Functions);

  getAudio(docID: string, text: string, languageCode: string, voiceName: string) {
    // connectFunctionsEmulator(this.fns, "127.0.0.1", 5001);
    const request: IAudioRequest = { docID, input: { text }, voice: { languageCode, name: voiceName } };
    return from(httpsCallableData<IAudioRequest, string>(this.fns, 'textToSpeech')(request)).pipe(
      map((response: string) => {
        // console.log('txt2speech', response);
        return response;
      })
    );
    // const options: HttpsCallableOptions = { }
    // from(httpsCallable(this.fns, '')(request)).pipe({
    //   response => {
    //   }
    // })
  }
}