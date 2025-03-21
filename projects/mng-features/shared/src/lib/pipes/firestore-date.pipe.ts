import { Pipe, PipeTransform } from '@angular/core';

import { IFirestoreTimestamp } from '../models/common.model';
import { formatDate } from '../common/utils';

@Pipe({
  name: 'firestoreDate',
  standalone: false
})
export class FirestoreDatePipe implements PipeTransform {

  transform(value: IFirestoreTimestamp, ...args: unknown[]): string {
    // console.log('fd', value, formatDate(value.toDate()));
    if (!value) {
      return '';
    }
    return formatDate(value.toDate());
  }

}
