export interface IAudioRequest {
  docID: string;
  audioConfig?: {
    audioEncoding?: string;
    effectsProfileId: Array<string>;
    pitch?: number; // 0 - 1
    speakingRate?: number; // 0 - 1
  };
  input: {
    text: string;
  };
  voice?: {
    name?: string;
    languageCode?: string;
  };
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