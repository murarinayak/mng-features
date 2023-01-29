import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { AngularFirestore, CollectionReference, DocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { WhereFilterOp } from '@firebase/firestore-types';
import firebase from 'firebase/compat/app'

import { ITEMS_PER_PAGE_GLOBAL } from '../common/constants';

// interface IFirestoreService {
//   collName: string;
//   returnType: IDocumentModel;
// }

export interface IFirestoreQueryParams {
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

export interface IFilterQuery {
  fieldRef: string;
  opStr: WhereFilterOp;
  value: string | number | boolean | Date | firebase.firestore.Timestamp;
}
export interface ISortQuery {
  fieldRef: string;
  dirStr: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends { id?: string }> { // implements IFirestoreService {

  collName = 'NA';
  collData: Array<unknown> = []; // firebase.firestore.QueryDocumentSnapshot<unknown>
  limitPerPage = ITEMS_PER_PAGE_GLOBAL;
  itemFirst: unknown;
  itemLast: unknown; // DocumentReference
  isLastPage = false;

  constructor(private ngFirestore: AngularFirestore) { }

  listWithParams(params?: IFirestoreQueryParams) {
    const pageNum = 1;
    const isNext = false;
    const indexStart: number = (pageNum - 1) * this.limitPerPage;
    const indexEnd: number = indexStart + this.limitPerPage;
    // console.log('ip', this.collData.length, indexStart, indexEnd);
    if (this.collData.length >= indexEnd) {
      // return of(this.formatResponseToType(this.collData.slice(indexStart, indexEnd)));
    }
    const callback: QueryFn = (ref: CollectionReference) => {
      let collRef = ref.orderBy('date');
      // let collRef;
      if (params.clauseWhere) {
        collRef = ref.where(params.clauseWhere.field, params.clauseWhere.operator, params.clauseWhere.value);
      }
      if (params.clauseOrderBy) {
        collRef = collRef.orderBy(params.clauseOrderBy.field, params.clauseOrderBy.direction);
      }
      if (params.pageNum > 1 && params.isNext && this.itemLast) {
        collRef = collRef.startAfter(this.itemLast);
      }
      collRef = collRef.limit(params.limit ?? this.limitPerPage);
      return collRef;
    };
    return this.list(callback);
  }

  list(callback: QueryFn = null): Observable<Array<T>> {
    if (!callback) {
      callback = (ref: CollectionReference) => ref.orderBy('tsCreatedAt'); // .limit(3)
    }
    return this.ngFirestore.collection(this.collName, callback).get().pipe(
      map((response) => response.docs), // firebase.firestore.QuerySnapshot<unknown>
      map((response: Array<any>) => { // firebase.firestore.QueryDocumentSnapshot<unknown>[]
        if (response.length) {
          this.collData = this.collData.concat(response);
          this.itemFirst = response[0];
          this.itemLast = response[response.length - 1];
        }
        return this.formatResponseToType(response);
      })
    )
  }

  get(id: string): Observable<T> {
    return this.ngFirestore.collection(this.collName).doc(id).get().pipe(
      map((item: DocumentSnapshot<T>) => {
        if (item.exists) {
          return { id: item.id, ...item.data() };
        }
        return item.data(); // this will be undefined
      })
    );
  }

  /**
   * This works to update when not sure if the document exists.
   * @param item T
   * @returns 
   */
  set(item: T): Observable<void> {
    const docID: string = item.id;
    delete item.id;
    return from(this.ngFirestore.collection(this.collName).doc(docID).set(item));
  }

  post(item: T) {
    return from(this.ngFirestore.collection(this.collName).add(item));
  }

  put(item: T): Observable<void> {
    const docID: string = item.id;
    delete item.id;
    return from(this.ngFirestore.collection(this.collName).doc(docID).update(item));
  }

  delete(itemID: string): Observable<void> {
    return from(this.ngFirestore.collection(this.collName).doc(itemID).delete());
  }

  // Paginated Data
  listFiltered(params: IFirestoreQueryParams): Observable<Array<T>> {
    const indexStart: number = (params.pageNum - 1) * this.limitPerPage;
    const indexEnd: number = indexStart + this.limitPerPage;
    // console.log('ip', this.collData.length, indexStart, indexEnd);
    if (this.collData.length > indexStart) {
      return of(this.formatResponseToType(this.collData.slice(indexStart, indexEnd)));
    }
    const callback: QueryFn<unknown> = (ref: CollectionReference) => {
      // console.log('ref', ref);
      ref = this.sortQuery(ref, params.arrSortQuery);
      ref = this.filterQuery(ref, params.arrFilterQuery);
      ref = this.limitQuery(ref, params.limit); // ?? this.limitPerPage);
      ref = this.lastItemQuery(ref, params);
      return ref;
    }
    return this.list(callback);
  }

  lastItemQuery(query, params: IFirestoreQueryParams) {
    if (params.pageNum > 1 && params.isNext && this.itemLast) {
      return query.startAfter(this.itemLast);
    }
    return query;
  }

  getFilteredList(pageNum = 1, isNext = true, uid = ''): Observable<Array<T>> {
    const indexStart: number = (pageNum - 1) * this.limitPerPage;
    const indexEnd: number = indexStart + this.limitPerPage;
    // console.log('ip', this.collData.length, indexStart, indexEnd);
    if (this.collData.length >= indexEnd) {
      return of(this.formatResponseToType(this.collData.slice(indexStart, indexEnd)));
    }
    const callback: QueryFn = (ref: CollectionReference) => {
      // let collRef = ref.orderBy('date');
      let collRef = ref.where('uidCreatedBy', '==', uid).orderBy('date', 'desc');
      if (pageNum > 1 && isNext && this.itemLast) {
        collRef = collRef.startAfter(this.itemLast);
      }
      collRef = collRef.limit(this.limitPerPage);
      return collRef;
    };
    return this.list(callback);
  }

  formatResponseToType(response): Array<T> {
    this.isLastPage = response.length < this.limitPerPage;
    return response.map(item => {
      const data = item.data() as T;
      const id = item.id;
      return { id, ...data } as T;
    });
  }




  // Utils
  dbReference = (refPath: string) => {
    return refPath ? this.ngFirestore.doc(refPath) : this.ngFirestore;
  };
  /**
   * ----------------------------------------------------------------------
   * @private
   * @function
   * builds and returns a query built from an array of filter (i.e. "where")
   * conditions
   * @param {Query} query - collectionReference or Query to build filter upong
   * @param {?number} limit - an (optional) 2xn array of sort (i.e. "orderBy") conditions
   * @returns Firestore Query object
   */
  limitQuery = (query, limit = 0) => {
    if (!limit) {
      return query;
    }
    return query.limit(limit);
  };
  /**
   * ----------------------------------------------------------------------
   * @private
   * @function
   * builds and returns a query built from an array of filter (i.e. "where")
   * conditions
   * @param {Query} query collectionReference or Query to build filter upong
   * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
   * @returns Firestore Query object
   */
  sortQuery = (query, sortArray: Array<ISortQuery> = null) => {
    if (!sortArray) {
      return query;
    }
    return sortArray.reduce((accQuery, sortEntry) => {
      return accQuery.orderBy(sortEntry.fieldRef, sortEntry.dirStr ?? "asc");
    }, query);
  };
  /**
   * ----------------------------------------------------------------------
   * @private
   * @function
   * builds and returns a query built from an array of filter (i.e. "where")
   * conditions
   * @param {Query} query collectionReference or Query to build filter upong
   * @param {?filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
   * @returns {Query} Firestore Query object
   */
  filterQuery = (query, filterArray: Array<IFilterQuery> = null) => {
    if (!filterArray) {
      return query;
    }
    return filterArray.reduce((accQuery, filter) => {
      return accQuery.where(filter.fieldRef, filter.opStr, filter.value);
    }, query);
  };
  /**
   * ----------------------------------------------------------------------
   * @async
   * @function collectRecordsByFilter
   * @static
   * @descriptions returns an array of documents from Firestore
   * @param {!string} tablePath a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {?string} refPath (optional) allows "table" parameter to reference a sub-collection
   * of an existing document reference (I use a LOT of structured collections)
   * @param {?filterObject} [filterArray] an array of filterObjects
   * The array is assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {?sortObject} [sortArray] a 2xn array of sort (i.e. "orderBy") conditions
   * @param {?number} limit limit result to this number (if at all)
   * @returns {Promise<Array<Record>>}
   */
  collectRecordsByFilter(tablePath: string, refPath = null, filterArray: Array<IFilterQuery> = null, sortArray: Array<ISortQuery> = null, limit = 0) {
    const db = this.dbReference(refPath);
    return this.limitQuery(
      this.sortQuery( // fieldRef, sortEntry.dirStr
        this.filterQuery(db.collection(tablePath), filterArray), // fieldRef, opStr, value
        sortArray
      ),
      limit
    );
  }

  myWrapper() {
    // return this.list(
    //   this.collectRecordsByFilter(this.collName)
    // );

  }

  /**
   * ----------------------------------------------------------------------
   * @async
   * @function fetchRecordByFilter
   * @static
   * @description fetches a SINGLE record from the database, using just a
   * filter to identify the document. DANGEROUSLY assumes the filter
   * identifies a SINGLE document, even if the query always returns an array
   * @param {!string} table a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {?filterObject} [filterArray] array of objects describing filter
   * operations
   * @param {?string} refPath - optional document reference to base tablePath from
   * @param {?WriteBatch|Transaction} batch - optional batch reference
   *
   * @returns {Promise<Record|WriteBatch|Transaction>}
   */
  // fetchRecordByFilter(
  //   table,
  //   filterArray,
  //   refPath = null,
  //   batch = null
  // ) {
  //   return this.collectRecordsByFilter(table, filterArray, refPath, batch).then(
  //     (records) => {
  //       return Promise.resolve(records[0]);
  //     }
  //   );
  // };
}


// getData(collectionName: string, ...queries: any[]): Observable<any> {
//   const collection = this.db.collection(collectionName, ref => {
//     return queries.reduce((accumulator, query) => {
//       const [fieldPath, opString, value] = query;

//       return accumulator.where(fieldPath, opString as WhereFilterOp, value);
//     }, ref);
//   });

//   return collection.snapshotChanges();
// }
// // Usage
// getData('sampleCollection', ['foo', '>', 0], ['foo', '<', 10]);
