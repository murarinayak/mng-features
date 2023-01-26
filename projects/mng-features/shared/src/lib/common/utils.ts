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

export const getDateFromFirestoreTimestamp = (date: { seconds: number, milliseconds: number }): Date | null => {
  return date?.seconds ? new Date(date.seconds * 1000) : null;
};

export const getServerTimestamp = (): IFirestoreTimestamp => {
  return firebase.firestore.FieldValue.serverTimestamp() as IFirestoreTimestamp;
}

export const getFirestoreTimestampFromDate = (date: Date): IFirestoreTimestamp => {
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

export const flattenArray = (data: Array<any>): Array<any> => {
  let children = [];
  return data.map(m => {
    if (m.children && m.children.length) {
      children = [...children, ...m.children];
    }
    return m;
  }).concat(children.length ? flattenArray(children) : children);
}

export const getISO8601Week = (date: Date) => {
  // Create a copy of the current date, we don't want to mutate the original
  // const date = new Date(this.getTime());

  // Find Thursday of this week starting on Monday
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const thursday = date.getTime();

  // Find January 1st
  date.setMonth(0); // January
  date.setDate(1);  // 1st
  const jan1st = date.getTime();

  // Round the amount of days to compensate for daylight saving time
  const days = Math.round((thursday - jan1st) / 86400000); // 1 day = 86400000 ms
  return Math.floor(days / 7) + 1;
};
