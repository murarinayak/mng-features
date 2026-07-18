import { InjectionToken } from '@angular/core';
import { Auth } from 'firebase/auth';
import { Database } from 'firebase/database';
import { Firestore } from 'firebase/firestore';
import { Functions } from 'firebase/functions';
import { FirebaseStorage } from 'firebase/storage';

export interface FirebaseServices {
  auth?: Auth;
  firestore?: Firestore;
  storage?: FirebaseStorage;
  functions?: Functions;
  database?: Database;
}

export const FIREBASE_SERVICES = new InjectionToken<FirebaseServices>('FIREBASE_SERVICES');
