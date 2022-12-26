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

  constructor(private ngFirestore: AngularFirestore) { }

  list(callback: QueryFn = null): Observable<Array<T>> {
    if (!callback) {
      callback = (ref: CollectionReference) => ref; //  .where('uidCreatedBy', '==', '5adb44ec2b576510688ed88c');
    }
    return this.ngFirestore.collection(this.collName, callback).snapshotChanges().pipe(
      map((actions: Array<any>) => {
        return actions.map(item => {
          const data = item.payload.doc.data() as T;
          const id = item.payload.doc.id;
          return { id, ...data } as T;
        });
      })
    );
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
