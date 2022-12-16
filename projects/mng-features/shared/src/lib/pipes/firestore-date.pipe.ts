import { Pipe, PipeTransform } from '@angular/core';
import { IFirestoreTimestamp } from '../models/common.model';
import { formatDate } from '../common/utils';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {

  transform(value: IFirestoreTimestamp, ...args: unknown[]): string {
    return formatDate(value.toDate());
  }

}
