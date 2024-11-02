import { Injectable } from '@angular/core';
import { Observable, from, map, of, tap } from 'rxjs';
import {
  AggregateField, AggregateQuerySnapshot,
  DocumentReference, Firestore, Query, QueryConstraint, addDoc,
  collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs,
  limit, orderBy, query, setDoc, startAfter, where
} from '@angular/fire/firestore';

import { FirestoreQuery } from '../models/firestore-query-params.model';
import { ITEMS_PER_PAGE_GLOBAL } from '../common/constants';
import { IDocumentModel } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends IDocumentModel> { // implements IFirestoreService {

  collName = 'NA';
  limitPerPage = ITEMS_PER_PAGE_GLOBAL;
  collData: Array<T> = [];
  itemFirst: T;
  itemLast: T; // DocumentSnapshot<T>; // DocumentReference
  isLastPage = false;

  constructor(private ngFirestore: Firestore) { }

  list(qry?: FirestoreQuery<T>) {
    // console.log('fire2list called');
    qry = qry ?? {};
    const {where: ws, orderBy: os} = qry;
    const orderBys = os?.map((condition) => {
      return orderBy(condition.field as string, condition.order);
    }) ?? [];
    const wheres = ws?.map((condition) => {
      return where(condition.field as string, condition.operator, condition.value);
    }) ?? [];
    // add logic for other query conditions
    if (!wheres.length && !orderBys.length) {
      orderBys.push(orderBy('tsCreatedAt', 'desc'));
    }
    if (!wheres.length) {
      // wheres.push(where('uidCreatedBy', '==', this.userService.getLoggedInUserID()));
    }
    const collName: string = qry.collName ?? this.collName;
    const coll = collection(this.ngFirestore, collName);
    const limitRecords: number = qry.limit ?? this.limitPerPage;
    const queryConstraints: Array<QueryConstraint> = [
      ...wheres,
      ...orderBys,
    ];
    if (limitRecords) {
      queryConstraints.push(limit(limitRecords));
    }
    const queryFn = query(
      coll,
      ...queryConstraints
    );
    return from(getDocs(queryFn)).pipe(
      // tap((response) => console.log('fire2list res', response)),
      map(results => results.docs.map((doc) => {
        return { id: doc.id,  ...doc.data() } as T
      }))
    );
  }

  listBatch(qry?: FirestoreQuery<T>) {
    // console.log('fire2listBatch called');
    // Check if data set already available
    const limitRecords: number = qry.limit ?? this.limitPerPage;
    const pagesAvailable: number = Math.ceil(this.collData.length / limitRecords);
    // The qry.cached is used to make sure that the first call of anu query returns fresh result
    if (!qry.cached) {
      // Reset everything
      this.collData = [];
      this.itemFirst = null;
      this.itemLast = null;
    }
    if (qry.cached && pagesAvailable >= qry.page) {
      const startPoint: number = (qry.page - 1) * limitRecords;
      return of(this.collData.slice(startPoint, startPoint + limitRecords))
    }
    let {where: ws, orderBy: os} = qry;
    if (!os?.length) {
      os = [{ field: 'tsCreatedAt', order: 'desc' }];
    }
    const orderBys = os?.map((condition) => {
      return orderBy(condition.field as string, condition.order);
    }) ?? [];
    const wheres = ws?.map((condition) => {
      return where(condition.field as string, condition.operator, condition.value);
    }) ?? [];
    // add logic for other query conditions
    // if (!orderBys) {
    //   orderBys.push(orderBy('tsCreatedAt', 'desc'));
    // }
    if (!wheres.length) {
      // wheres.push(where('uidCreatedBy', '==', this.userService.getLoggedInUserID()));
    }
    const coll = collection(this.ngFirestore, this.collName);
    const queryConstraints: Array<QueryConstraint> = [
      ...wheres,
      ...orderBys,
      limit(limitRecords),
    ];
    if (!qry.startAfter && qry.page > 1) {
      qry.startAfter = this.itemLast;
    }
    if (qry.startAfter) {
      // queryConstraints.push(startAfter(qry.startAfter));
      // queryConstraints.push(startAfter(qry.startAfter['tsCreatedAt']));
      const sortField: string = os[0].field as string;
      const sortValue = qry.startAfter[sortField];
      queryConstraints.push(startAfter(sortValue));
    }
    const queryFn: Query = query(coll, ...queryConstraints);
    return from(getDocs(queryFn)).pipe(
    // return from(collectionData(queryFn)).pipe(
      // tap((response) => {
      //   console.log('fire2list res', response);
      //   // this.itemFirst = response.docs[0];
      //   // this.itemLast = response.docs[response.docs.length - 1];
      // }),
      map(results => results.docs.map((doc) => ({ id: doc.id,  ...doc.data() } as T ))),
      tap((response: Array<T>) => {
        this.collData = this.collData.concat(response);
        this.itemLast = this.collData.at(-1);
        // console.log('ba', this.itemLast, this.collData);
      })
    );
  }

  get(id: string, sCollName?: string): Observable<T> {
    const collName: string = sCollName ?? this.collName;
    const ref = doc(this.ngFirestore, collName + '/' + id);
    return from(getDoc(ref)).pipe(
      map(response => {
        if (response.exists()) {
          return { id: response.id, ...response.data() } as T; 
        }
        return null;
      }),
      // tap(response => { console.log('fire2 get', response); })
    );
  }

  /**
   * This works to update when not sure if the document exists.
   * @param item T
   * @returns 
   */
  set(item: T, sCollName?: string): Observable<string> {
    // console.log('set called');
    const collName: string = sCollName ?? this.collName;
    const docID: string = item.id ?? this.generateFirestoreDocID();
    if (!docID) {
      alert('No docID present');
      return of(null);
    }
    const itemSpread: T = { ...item };
    delete itemSpread.id;
    const ref = doc(this.ngFirestore, collName + '/' + docID);
    return from(setDoc(ref, itemSpread)).pipe(
      tap(() => item.id = docID),
      map(() => docID)
    );
  }

  put(item: T) {
    console.log('put called');
    return this.set(item);
  }

  post(item: T, sCollName?: string): Observable<string> {
    const collName: string = sCollName ?? this.collName;
    console.log('post called');
    // return of({});
    return from(addDoc(collection(this.ngFirestore, collName), item)).pipe(
      // tap(response => { console.log('fire2 post', response); }),
      map((response: DocumentReference) => response.id)
    );
  }

  delete(id: string, sCollName?: string) {
    const collName: string = sCollName ?? this.collName;
    // return of(true);
    const ref = doc(this.ngFirestore, collName + '/' + id);
    return from(deleteDoc(ref));
  }

  // getFilteredList(...args){
  //   // return of([]);
  //   return this.list();
  // }
  // listFiltered(...args){
  //   return of([]);
  // }
  // listWithParams(...args){
  //   return this.list();
  //   // return of([]);
  // }

  /**
   * @deprecated
   * @param args 
   * @returns 
   */
  put(...args) {
    console.log(args);
    return of(null);
  }



  generateFirestoreDocID() {
    return doc(collection(this.ngFirestore, '_')).id;
  }

  getCount(collName?: string): Observable<number> {
    const coll = collection(this.ngFirestore, collName ?? this.collName);
    const q = query(coll); //, where("state", "==", "CA"));
    return from(getCountFromServer(q)).pipe(
      map((snapshot: AggregateQuerySnapshot<{ count: AggregateField<number> }>) => {
        return snapshot.data().count;
      })
    );
  }

}