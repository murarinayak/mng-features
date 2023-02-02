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
  const arrValue: Array<number | string> = allItems.map(item => item.value);
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
  return data.reduce((acc: Array<any>, item) => {
    acc.push(item);
    if (item.children?.length) {
      acc = acc.concat(flattenArray(item.children));
    }
    return acc;
  }, []);
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

export const getDaysInMonth = (year: number, month: number): number => {
  let days = 31; // For all others not defined in case
  switch (month) {
    case 1: { // Feb
      const isLeapYear = year % 4 === 0;
      days = isLeapYear ? 29 : 28;
      break;
    }
    case 3: // Apr
    case 5: // Jun
    case 8: // Sept
    case 10: { // Nov
      days = 30;
      break;
    }
  }
  return days;
}

export const getYearMonth = (date: Date) => {
  return '' + date.getFullYear() + ('0' + date.getMonth()).slice(-2);
}
export const getYearMonthDay = (date: Date) => {
  return '' + date.getFullYear() + ('0' + date.getMonth()).slice(-2) + ('0' + date.getDay()).slice(-2);
}
