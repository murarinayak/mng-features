import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { IAudioRequest } from '../../../../../../../../../models/common.model';

@Injectable()
export class M2NTextToSpeechService {

  constructor(
    private fns: AngularFireFunctions,
  ) {}

  getAudio(docID: string, text: string) {
    // text = 'This is a test story designed to test the audio output of the story.';
    const request: IAudioRequest = { docID, text };
    // return httpsCallableData<IAudioRequest, string>(this.functions, 'textToSpeech')(request).pipe(
    return this.fns.httpsCallable('textToSpeech')(request).pipe(
      map((response: string) => {
        // console.log('txt2speech', response);
        return response;
      })
    );
  }
}