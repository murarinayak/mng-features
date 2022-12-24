export interface IPost {
  id: string;
  name: string;
  title: string;
  excerpt: string;

  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
}

export interface IWpPost {
  id: number;
  jetpack_featured_media_url: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  date: string;
  tags: Array<number>;
}