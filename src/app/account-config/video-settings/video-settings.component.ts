import { element } from 'protractor';
import { timer } from 'rxjs';
import { NotificationService } from './../../services/notification.service';
import { UserLoggendIn } from './../../models/userLoggedIn';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VideosServiceService } from '../../services/videos-service.service';
import { LoginService } from '../../services/login.service';
import { ResponseAPi } from '../../models/responseApi';
import { Videos } from '../../models/videos';

@Component({
  selector: 'app-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.css']
})
export class VideoSettingsComponent implements OnInit {

  page = 1;
  count = 4;
  totalPages: number;
  videos: Videos[];
  @ViewChild('inputPag')
  inputPag: ElementRef;

  element: ElementRef;

  constructor(private videoService: VideosServiceService, private loginService: LoginService,
    private notificationService: NotificationService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getVideosByUserId(this.page - 1, this.count);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  getVideosByUserId(page: number, count: number) {
    return this.videoService.getVideosByUserId(this.userLoggendIn().user.id, page, count).subscribe(
      (videos) => {
        this.videos = videos.data.content;
        console.log(this.videos);
        this.totalPages = videos.data.totalPages;
      }
    );
  }

  changePage(leftRight: string) {
    if (leftRight === 'left') {
      this.page = this.page - 1;
    } else if (leftRight === 'right') {
      this.page = this.page + 1;
    } else {
      this.page = this.inputPag.nativeElement.value;
    }

    this.getVideosByUserId(this.page - 1, this.count);
  }

  deleteVideoModal(videoId, index) {
    this.element = this.elementRef.nativeElement.getElementsByClassName('trsModal')[index];
    console.log(this.element);
    this.notificationService.notifyModal(`Deseja mesmo excluir este vídeo?`, videoId, 'deleteVideo', this.element);

  }

}
