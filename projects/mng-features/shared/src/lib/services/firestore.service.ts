import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { AngularFirestore, CollectionReference, DocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';

import { ITEMS_PER_PAGE_GLOBAL } from '../common/constants';

// interface IFirestoreService {
//   collName: string;
//   returnType: IDocumentModel;
// }

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends { id?: string }> { // implements IFirestoreService {

  collName = 'NA';
  collData: Array<unknown> = []; // firebase.firestore.QueryDocumentSnapshot<unknown>
  itemsPerPage = ITEMS_PER_PAGE_GLOBAL;
  itemFirst: unknown;
  itemLast: unknown; // DocumentReference
  isLastPage = false;

  constructor(private ngFirestore: AngularFirestore) { }

  list(callback: QueryFn = null): Observable<Array<T>> {
    if (!callback) {
      callback = (ref: CollectionReference) => ref.orderBy('tsCreatedAt').limit(3)
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
  getPaginatedList(pageNum = 1, isNext = true): Observable<Array<T>> {
    const indexStart: number = (pageNum - 1) * this.itemsPerPage;
    const indexEnd: number = indexStart + this.itemsPerPage;
    // console.log('ip', this.collData.length, indexStart, indexEnd);
    if (this.collData.length >= indexEnd) {
      return of(this.formatResponseToType(this.collData.slice(indexStart, indexEnd)));
    }
    const callback: QueryFn = (ref: CollectionReference) => {
      let collRef = ref.orderBy('tsCreatedAt');
      if (pageNum > 1 && isNext && this.itemLast) {
        collRef = collRef.startAfter(this.itemLast);
      }
      collRef = collRef.limit(this.itemsPerPage);
      return collRef;
    };
    return this.list(callback);
  }

  getFilteredList(pageNum = 1, isNext = true, uid = ''): Observable<Array<T>> {
    const indexStart: number = (pageNum - 1) * this.itemsPerPage;
    const indexEnd: number = indexStart + this.itemsPerPage;
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
      collRef = collRef.limit(this.itemsPerPage);
      return collRef;
    };
    return this.list(callback);
  }

  formatResponseToType(response): Array<T> {
    this.isLastPage = response.length < this.itemsPerPage;
    return response.map(item => {
      const data = item.data() as T;
      const id = item.id;
      return { id, ...data } as T;
    })
  }
}
