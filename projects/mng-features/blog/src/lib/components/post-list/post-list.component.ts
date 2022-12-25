import { Component } from '@angular/core';
import { IWpPost } from '../../common/common.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'mng-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  currentPage = 1;
  posts: Array<IWpPost> = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(direction?: 1 | 2) {
    if (direction === 1) {
      this.currentPage--;
    } else if (direction === 2) {
      this.currentPage++;
    }
    this.blogService.getPosts(this.currentPage).subscribe(
      (response: any) => {
        this.posts = response ?? [];
      }
    );
  }

  getCurrentPage() {
    return this.blogService.getCurrentPage();
  }
}
