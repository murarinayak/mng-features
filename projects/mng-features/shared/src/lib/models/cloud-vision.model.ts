interface IGoogleVisionRequest {
  url: string;
}
export interface IGoogleVisionResponse {
  // There are more properties, but just using the ones that are required for now
  fullTextAnnotation: {
    pages: Array<unknown>;
    text: string;
  };
}
