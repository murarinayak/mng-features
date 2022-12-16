import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _httpClient: HttpClient) { }

  get(url) {
    return this._httpClient
      .get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  post(url, data) {
    return this._httpClient.post(url, data);
  }

  put(url, data) {
    return this._httpClient.put(url, data);
  }

  delete(url) {
    return this._httpClient.delete(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    const errorMessage = error.error.responseMessage || 'Something bad happened; please try again later.';

    return throwError(errorMessage);
  }
}
