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
  jetpack_featured_media_url: string;
  excerpt: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  link: string;
  date: string;
}