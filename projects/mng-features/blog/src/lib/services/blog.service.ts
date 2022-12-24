import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://murarinayak.com/blog/wp-json/wp/v2/posts?_embed';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private currentPage = 4;
  private postsPerPage = 6;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCurrentPage() {
    return this.getCurrentPage;
  }

  getPosts(currentPage: number) {
    this.currentPage = currentPage;
    const fields = ['id', 'title', 'excerpt', 'jetpack_featured_media_url', 'date', 'link'];
    let url = `${URL}&page=${this.currentPage}&per_page=${this.postsPerPage}`;
    if (fields.length) {
      url = url.concat('&_fields=', fields.join(','));
    }
    return this.httpClient.get(url);
  }
}
