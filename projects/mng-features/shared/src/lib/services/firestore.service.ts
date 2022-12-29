import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { IDocumentModel } from '../models/common.model';

interface IFirestoreService {
  collName: string;
  returnType: IDocumentModel;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends { id?: string }> implements IFirestoreService {

  collName = 'NA';
  returnType: IDocumentModel;
  lastItem;

  constructor(private ngFirestore: AngularFirestore) { }

  list(callback: QueryFn = null): Observable<Array<T>> {
    if (!callback) {
      callback = (ref: CollectionReference) => ref.orderBy('tsCreatedAt').limit(2)
    }
    if (this.lastItem) {
      callback = (ref: CollectionReference) => ref.orderBy('tsCreatedAt').startAfter(this.lastItem).limit(2)
    }
    return this.ngFirestore.collection(this.collName, callback).get().pipe(
      map((response) => response.docs), // firebase.firestore.QuerySnapshot<unknown>
      map((response) => { // firebase.firestore.QueryDocumentSnapshot<unknown>[]
        if (response.length) {
          this.lastItem = response[response.length - 1]; // .payload.doc.data();
        }
        console.log('lastitem', this.lastItem);
        return response.map(item => {
          const data = item.data() as T;
          const id = item.id;
          return { id, ...data } as T;
        });
      })
    )
  }

  get(itemID: string): Observable<T> {
    return this.ngFirestore.collection(this.collName).doc(itemID).get().pipe(
      map((item: DocumentSnapshot<T>) => {
        return { id: item.id, ...item.data() };
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

}
