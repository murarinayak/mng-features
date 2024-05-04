import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWpPost } from '../../common/common.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'mng-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post: IWpPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BlogService,
  ) {}

  ngOnInit() {
    this.getPost(this.activatedRoute.snapshot.paramMap.get('id') ?? '');
  }

  getPost(id: string) {
    if (id) {
      this.service.get(id).subscribe({
        next: (response: IWpPost) => {
          // console.log('post', response);
          this.post = response;
        }
      });
    }
  }
}
