import firebase from 'firebase/compat/app'

export type IFirestoreTimestamp = firebase.firestore.Timestamp;

export interface IEnvironment {
  appName: string;
  API_URL: string;
}

export interface IDocumentModel {
  id?: string;
  v?: number;
  uidCreatedBy: string;
  uidUpdatedBy?: string;
  tsCreatedAt?: IFirestoreTimestamp;
  tsUpdatedAt?: IFirestoreTimestamp;
}

export interface IOption {
  label: string;
  value: string;
  total?: number;
}

export interface IResponseModel {
  code: number | string;
  success: boolean;
  message: string;
  data: any;
}

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IAuthUser {
  token?: string, // TODO Remove this
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  locale: string; // might use this for translation
  phoneNumber: string;
  photoURL: string;
  isAnonymous: boolean;
  // categories?: Array<IOption>;
}