import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IStory } from '../../common/common.model';

@Component({
  selector: 'app-post-item-short',
  templateUrl: './post-item-short.component.html',
  styleUrls: ['./post-item-short.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class PostItemShortComponent implements OnInit {

  @Input() post: IStory;

  constructor() { }

  ngOnInit(): void {
  }

}
