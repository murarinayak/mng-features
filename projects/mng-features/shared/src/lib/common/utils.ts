// import * as moment from 'moment';
import firebase from 'firebase/compat/app'

import { IFirestoreTimestamp, IOption } from '../models/common.model';
import { RouteParts } from './constants';

export const formatDate = (date) => {
  // return moment(date).format('DD/MM/YYYY'); // 'L'
  return new Date(date).toLocaleDateString();
};

export const formatPrice = (price: number, places = 4) => {
  const power: number = Math.pow(10, places);
  return Math.round(price * power) / power;
};

export const getDateFromFirestoreDate = (date: { seconds: number, milliseconds: number }): Date | null => {
  return date?.seconds ? new Date(date.seconds * 1000) : null;
};

export const getServerTimestamp = (): IFirestoreTimestamp => {
  return firebase.firestore.FieldValue.serverTimestamp() as IFirestoreTimestamp;
}

export const convertDateToFirestoreTimestamp = (date) => {
  // console.log('d1', date);
  // console.log('d2', firebase.firestore.Timestamp.fromDate(new Date(date)));
  return firebase.firestore.Timestamp.fromDate(date);
}

export const isRouteNew = (value: string) => value === RouteParts.NEW;
export const getUniqueValueFromLabel = (label: string, allItems: Array<IOption>) => {
  const arrValue: Array<string> = allItems.map(item => item.value);
  const labelToValue: string = label.toLowerCase().trim().replace(/ /g, '-');
  let counter = 0;
  let isDuplicate = true;
  let value: string = labelToValue;
  while (isDuplicate) {
    if (counter > 0) {
      value = `${labelToValue}-${counter}`;
    }
    counter++;
    isDuplicate = arrValue.indexOf(value) !== -1;
  }
  return value;
};