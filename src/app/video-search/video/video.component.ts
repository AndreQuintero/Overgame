import { Videos } from './../../models/videos';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { timer } from 'rxjs';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [
    trigger('videoSlide', [
      state('hidden', style({
        marginLeft: '-250px',
        opacity: 0
      })),
      state('visible', style({
        marginLeft: '0px',
        opacity: 1
      })),
      transition('hidden => visible', animate('500ms 0s ease-in'))
    ])
  ]
})
export class VideoComponent implements OnInit {

  @Input() videoPai: Videos;
  constructor(private videos: ElementRef ) { }

  @ViewChild('videoPlayer')
  videoPlayer: ElementRef;

  animation = 'hidden';

  ngOnInit() {

    timer(500).subscribe( (tempo) => {
      this.animation = 'visible';
    } );

  }
  videoStart(overOut: string): void {
    if (overOut === 'over') {

      this.videoPlayer.nativeElement.muted = true;
      this.videoPlayer.nativeElement.autoplay = true;
      this.videoPlayer.nativeElement.loop = true;
      this.videoPlayer.nativeElement.load();

    } else {

      this.videoPlayer.nativeElement.autoplay = false;
      this.videoPlayer.nativeElement.muted = false;
      this.videoPlayer.nativeElement.loop = false;
      this.videoPlayer.nativeElement.load();
    }
  }

  calculaPorcentagem(): number {
    const total = this.videoPai.likes + this.videoPai.dislikes;
    if (total === 0) {
      return 0;
    }
    return Math.round(((this.videoPai.likes / total) * 100 ));
  }
}
