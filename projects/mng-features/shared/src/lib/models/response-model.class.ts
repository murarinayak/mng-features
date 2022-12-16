export class ResponseModel {
  constructor(
    public success: boolean,
    public data: any,
    public responseMessage: string,
    public responseCode: number
  ) { }
}
