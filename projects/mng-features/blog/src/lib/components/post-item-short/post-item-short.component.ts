import { Component, Input, OnInit } from '@angular/core';

import { IStory } from '../../common/common.model';

@Component({
  selector: 'app-post-item-short',
  templateUrl: './post-item-short.component.html',
  styleUrls: ['./post-item-short.component.scss'],
  standalone: false
})
export class PostItemShortComponent implements OnInit {

  @Input() post: IStory;

  constructor() { }

  ngOnInit(): void {
  }

}
