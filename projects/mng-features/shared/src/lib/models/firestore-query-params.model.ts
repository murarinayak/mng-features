import { DocumentSnapshot, OrderByDirection } from '@angular/fire/firestore';
import { WhereFilterOp } from '@firebase/firestore-types';
import firebase from 'firebase/compat/app'

type IFirestoreValueType = string | number | boolean | Date | firebase.firestore.Timestamp;

export interface IFilterQuery {
  fieldRef: string;
  opStr: WhereFilterOp;
  value: IFirestoreValueType | Array<IFirestoreValueType>;
}
export interface ISortQuery {
  fieldRef: string;
  dirStr: 'asc' | 'desc';
}

export interface IFirestoreQueryParams {
  fromCache?: boolean;
  limit?: number;
  pageNum?: number;
  isNext?: boolean;
  dateAfter?: string;
  dateBefore?: string;
  clauseWhere?: { field: string, operator: WhereFilterOp, value: string | number | boolean };
  clauseOrderBy?: { field: string, direction: 'asc' | 'desc' };
  arrFilterQuery?: Array<IFilterQuery>;
  arrSortQuery?: Array<ISortQuery>;
}






export interface WhereCondition<T> {
  field: keyof T;
  operator: WhereFilterOp;
  value: T[keyof T] | Array<T[keyof T]>;
}

export interface OrderByCondition<T> {
  field: keyof T;
  order?: OrderByDirection;
}

export interface FirestoreQuery<T> {
  limit?: number;
  startAt?: number | string | T | DocumentSnapshot<T>;
  startAfter?: number | string | T | DocumentSnapshot<T> | null;
  endAt?: number | T | DocumentSnapshot<T>;
  endBefore?: number | T | DocumentSnapshot<T>;
  orderBy?: OrderByCondition<T>[];
  where?: WhereCondition<T>[];
  // Custom
  page?: number;
  cached?: boolean;
}