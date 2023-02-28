interface IGoogleVisionRequest {
  url: string;
}
export interface IGoogleVisionResponse {
  fullTextAnnotation: {
    pages: Array<unknown>;
    text: string;
  };
}
