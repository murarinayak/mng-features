import { IDocumentModel, IFirestoreTimestamp } from 'mng-features/shared';


export interface IUploadedFile extends IDocumentModel {
    // uid?: string;
    // id?: string;
    filePath: string;
    contentType?: string;
    dateCreated?: IFirestoreTimestamp;
  }