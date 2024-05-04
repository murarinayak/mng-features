import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWpPost } from '../../common/common.model';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  // animations:
})
export class PostItemComponent implements OnInit {

  @Input() post: IWpPost;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // console.log('post', this.post);
  }

  onLinkClick() {
    // console.log('show post view');
    this.router.navigate(['..', this.post.id], { relativeTo: this.activatedRoute });
  }

}
