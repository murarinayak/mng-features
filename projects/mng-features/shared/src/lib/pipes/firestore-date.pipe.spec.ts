import { FirestoreDatePipe } from './firestore-date.pipe';

describe('FirestoreDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FirestoreDatePipe();
    expect(pipe).toBeTruthy();
  });
});
