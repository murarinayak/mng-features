import firebase from 'firebase/compat/app'

export type IFirestoreTimestamp = firebase.firestore.Timestamp;

export interface IEnvironment {
  appName: string;
  appVersion: string;
  apiUrl: string;
}

export interface ILibraryConfig {
  environment: IEnvironment;
  menu: Array<IMenuItem>;
  showLeftNav: boolean;
}

export interface IDocumentModel {
  id?: string;
  v?: number;
  uidCreatedBy: string;
  uidUpdatedBy?: string;
  tsCreatedAt?: IFirestoreTimestamp;
  tsUpdatedAt?: IFirestoreTimestamp;
}

export interface IMenuItem {
  id?: number;
  label: string;
  path: string;
  icon?: string;
}

export interface IOption {
  label: string;
  value: string;
  total?: number;
  icon?: string;
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