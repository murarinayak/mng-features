export interface IAudioRequest {
  docID: string;
  text: string;
  languageCode?: string;
  voiceName?: string;
}

export interface IProcessedItem {
  imageURL: string;
  textParsed: string;
  audioURL: string;
}

export interface IPost {
  id: string;
  name: string;
  title: string;
  excerpt: string;
}