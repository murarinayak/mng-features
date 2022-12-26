export class ToastMessage {
  static SUCCESS = 'success';
  static ERROR = 'error';

  constructor(
    public detail: string,
    public severity: string = 'success',
    public summary: string = 'Information',
    public life = 5000
    // public sticky: boolean = true
  ) {
    if (severity === ToastMessage.ERROR && summary === 'Information') {
      this.summary = 'Error';
    }
  }
}
