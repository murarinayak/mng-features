import { Injectable } from '@angular/core';
import { Database, DatabaseReference, Query, child, endAt, get, limitToFirst, list, orderByChild, query, ref, remove, set, startAt, update } from '@angular/fire/database';
import { from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RTDBService<T> {

  collName = '';
  dbRef: DatabaseReference;

  constructor(private database: Database) {
    this.dbRef = ref(this.database);
    this.collName = 'stories';
  }

  list(start = '', end = '') {
    return from(
      list(
        query(
          child(this.dbRef, this.collName),
          orderByChild('label'),
          limitToFirst(5),
          startAt(start),
          endAt(end)
        )
      )
    ).pipe(
      map((response: Array<any>) => response.map(item => {
        return { value: item.snapshot.key, ...item.snapshot.val() };
      }))
    );
  }

  get(start = '', end = '') {
    return from(
      get(
        query(
          child(this.dbRef, this.collName),
          orderByChild('label'),
          limitToFirst(5),
          startAt(start),
          endAt(end)
        )
      )
    ).pipe(
      map(response => {
        return response;
      })
    );
  }

  post(label: string) {
    return from(
      set(
        ref(this.database, `${this.collName}/`),
        { label }
      )
    );
  }

  put(id: string, label: string) {
    return from(
      update(
        ref(this.database, `${this.collName}/${id}`),
        { label }
      )
    );
  }

  delete(id: string) {
    return from(
      remove(
        ref(this.database, `${this.collName}/${id}`)
      )
    );
  }

}


// https://aurigait.com/blog/realtime-database-in-firebase-v9/

// SET
// import { getDatabase, ref, set } from "firebase/database";
// function writeUserData(userId) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: “JohnDoe”,
//   });
// }

// Code for update()
// import { getDatabase, ref, update } from "firebase/database";
 
// function updateUserData(userId) {
//   const db = getDatabase();
//   update(ref(db, 'users/' + userId), {
//     username: "JohnDoe",
//   });
// }
// Both set() and update() can return a Promise you can use to know when “write” is committed to the database.



// Code for onValue()
// import { getDatabase, ref, onValue} from "firebase/database";
 
// const db = getDatabase();
// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

// Code for get()JavaScript
// import { getDatabase, ref, child, get } from "firebase/database";
 
// const dbRef = ref(getDatabase());
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });