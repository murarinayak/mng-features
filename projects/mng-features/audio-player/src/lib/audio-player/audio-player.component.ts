import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mng-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class MNGAudioPlayerComponent implements OnInit {

  @Input() src: string;

  constructor(
    // private fileStorageService: FileStorageService,
  ) { }

  ngOnInit(): void {
  }

}
