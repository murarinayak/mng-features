import { Timestamp } from 'firebase/firestore';
export type IFirestoreTimestamp = Timestamp;

export interface IEnvironment {
  appName: string;
  appVersion: string;
  appNamespace: string;
  apiUrl: string;
  firebase: IFirebaseConfig;
}

export interface ILibraryConfig {
  environment: IEnvironment;
  menu: Array<IMenuItem>;
  showLeftNav: boolean;
  themed?: boolean;
}

export interface IFirebaseConfig {
  storageBucket: string;
}

export interface IDocumentModel {
  id?: string;
  v?: number;
  hidden?: boolean;
  uidCreatedBy?: string;
  uidUpdatedBy?: string;
  tsCreatedAt?: IFirestoreTimestamp;
  tsUpdatedAt?: IFirestoreTimestamp;
}

export interface IMenuItem {
  id?: number;
  label: string;
  path?: string;
  icon?: string;
  roles?: Array<number>;
  onClick?: () => void;
}

export interface IOption {
  label: string;
  value?: number | string;
  imageUrl?: string;
  readonly?: boolean;
  hidden?: boolean;
  children?: Array<IOption>;
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
  token?: string; // TODO Remove this
  id?: string;
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
  userType: number;
}

export interface IEChartClickEventData {
  name: string,
  value: string,
  ref: string;
}
export interface IEChartClickEvent {
  data: IEChartClickEventData;
}
