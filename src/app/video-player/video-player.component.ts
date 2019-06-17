import { DescurtidaVideo } from './../models/descurtidaVideo';
import { DescurtidaVideoService } from './../services/descurtida-video.service';
import { CurtidaVideo } from './../models/curtidaVideo';
import { CurtidaVideoService } from './../services/curtida-video.service';
import { NotificationService } from './../services/notification.service';
import { ComentariosService } from './../services/comentarios.service';
import { UserLoggendIn } from './../models/userLoggedIn';
import { Comentarios } from './../models/comentarios';
import { Videos } from './../models/videos';
import { VideosServiceService } from './../services/videos-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseAPi } from '../models/responseApi';
import { LoginService } from '../services/login.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { timer } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  animations: [
    trigger('comment-right', [
      state('normal', style({
        marginLeft: '5%',
        opacity: 1
      })),
      state('move', style({
        opacity: 0,
        marginLeft: '110%'
      })),
      transition('normal => move', animate('500ms 0s ease-in-out')),
      transition('move => normal', animate('0s 0s ease-in'))
    ])
  ]
})
export class VideoPlayerComponent implements OnInit {

  video: Videos;
  videosUser: Videos [];
  comentarios: Comentarios[];
  userId: string;
  totalPages: number;
  videoId = '';
  animation = 'normal';

  @ViewChild('likeVideo')
  likeVideo: ElementRef;

  likeVideoFlag = false;

  @ViewChild('dislikeVideo')
  dislikeVideo: ElementRef;

  dislikeVideoFlag = false;

  @ViewChild('inputSearch')
  private inputSearch: ElementRef;

  @ViewChild('inputComment')
  private inputComment: ElementRef;

  curtidaVideo: CurtidaVideo;
  descurtidaVideo: DescurtidaVideo;

  constructor(private route: ActivatedRoute, private videoService: VideosServiceService,
    private loginService: LoginService, private comentariosService: ComentariosService,
    private notificationService: NotificationService, private router: Router,
    private curtidaVideoService: CurtidaVideoService, private descurtidaVideoService: DescurtidaVideoService) { }

  ngOnInit() {
    this.route.params.subscribe((params => {
      const id = params['id'];
      this.getVideoById(id);

    }));
  }

  verificaLikeExiste(videoId: string) {
    this.curtidaVideoService.getCurtida(videoId, this.userLoggendIn().token).subscribe(
      (curtida: ResponseAPi) => {
        console.log(curtida);
        if (curtida.data !== null) {
          this.curtidaVideo = curtida.data;
          this.likeVideoFlag = true;
          this.likeVideo.nativeElement.classList.add('colorBlue');
        } else {
          this.curtidaVideo = undefined;
          this.likeVideoFlag = false;
          this.likeVideo.nativeElement.classList.remove('colorBlue');
        }
        this.verificaDislikeExiste(videoId);
      }
    );
  }

  verificaDislikeExiste(videoId: string) {
    this.descurtidaVideoService.getDescurtida(videoId, this.userLoggendIn().token).subscribe(
      (descurtida: ResponseAPi) => {
        console.log(descurtida);
        if (descurtida.data !== null) {
          this.descurtidaVideo = descurtida.data;
          this.dislikeVideoFlag = true;
          this.dislikeVideo.nativeElement.classList.add('colorRed');
        } else {
          this.descurtidaVideo = undefined;
          this.dislikeVideoFlag = false;
          this.dislikeVideo.nativeElement.classList.remove('colorRed');
        }
      }
    );
  }

  redireciona() {
    this.router.navigate(['/'], {queryParams: {title: this.inputSearch.nativeElement.value, page: 1} });
  }

  limpar(): void {
    this.inputComment.nativeElement.value = '';
    this.inputComment.nativeElement.focus();
  }

  getVideoById(id: string): void {
    this.video = null;
    this.videoId = '';
    this.videoService.getVideosById(id).subscribe((video: ResponseAPi) => {
      this.video = video.data;
      this.comentarios = video.data.comentarios.content;
      this.totalPages = video.data.comentarios.totalPages;
      this.userId = video.data.user.id;
      this.videoId = this.video.id;
      this.getVideosByUserId(this.userId);
    });
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  getVideosByUserId(userId: string): void {
    this.videoService.getVideosByUserId(userId, 0, 10).subscribe((videosUser: ResponseAPi) => {
      this.videosUser = videosUser.data.content;
      if (this.isLoggedIn()) {
        this.verificaLikeExiste(this.video.id);
      }
    });
  }

  commentVideo() {
    if (this.inputComment.nativeElement.value === '') {
      this.notificationService.notify(`Escreva algo para comentar`);
    } else {
      if ( this.isLoggedIn() === true) {
        this.comentariosService.commentVideo(this.videoId, this.inputComment.nativeElement.value, this.userLoggendIn().token)
        .subscribe((comment) => {
          this.comentarios.unshift(comment.data);
          this.inputComment.nativeElement.value = '';
          this.animation = 'move';
          this.notificationService.notify(`Comentário Realizado!`);
          timer(500).subscribe( (tempo) => {
            this.animation = 'normal';
          } );
        }, (err) => {
          this.inputComment.nativeElement.value = '';
          this.notificationService.notify(`Algo inesperado aconteceu, tente novamente mais tarde :(`);
        } );
      }
    }

  }

  likeDislike(likeOrDislike: string): void {

    if (this.isLoggedIn() === false) {
      if (likeOrDislike === 'like') {
        this.notificationService.notify(`Faça o Login para porder curtir o vídeo`);
      } else {
        this.notificationService.notify(`Faça o Login para porder descurtir o vídeo`);
      }

    } else {


      if (likeOrDislike === 'like') {
         this.likeVideoFlag = !this.likeVideoFlag;
         if (this.likeVideoFlag === true) {
             this.createCurtida(this.video.id, this.userLoggendIn().token);
             if (this.dislikeVideoFlag === true) {
                this.dislikeVideo.nativeElement.classList.remove('colorRed');
                this.video.dislikes = this.video.dislikes - 1;
                this.dislikeVideoFlag = false;
             }
         } else {
          // se ele deletar
          this.deleteCurtida(this.video.id, this.userLoggendIn().token);
         }

      } else {
        this.dislikeVideoFlag = !this.dislikeVideoFlag;
        if (this.dislikeVideoFlag === true) {
            this.createDescurtida(this.video.id, this.userLoggendIn().token);
            if (this.likeVideoFlag === true) {
              this.likeVideo.nativeElement.classList.remove('colorBlue');
              this.video.likes = this.video.likes - 1;
              this.likeVideoFlag = false;
            }
        } else {
            this.deleteDescurtida(this.video.id, this.userLoggendIn().token);
        }
      }
    }
  }


  createDescurtida(videoId: string, token: string) {
    this.descurtidaVideoService.createDescurtida(videoId, token)
    .subscribe(
      (descurtida: ResponseAPi) => {
        this.dislikeVideo.nativeElement.classList.add('colorRed');
        this.video.dislikes = (this.video.dislikes + 1);
        this.notificationService.notify(`Você descurtiu o vídeo`);
      }, (err) => {
          this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }


  deleteDescurtida(videoId: string, token: string) {
    this.descurtidaVideoService.deleteCurtida(videoId, token)
    .subscribe(
      (descurtida: ResponseAPi) => {
        this.dislikeVideo.nativeElement.classList.remove('colorRed');
        this.video.dislikes = this.video.dislikes - 1;
        this.notificationService.notify(`Você removeu sua descurtida`);
      }, (err) => {
        this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }

  deleteCurtida(video: string, token: string) {
    this.curtidaVideoService.deleteCurtida(video, token)
    .subscribe(
      (curtida: ResponseAPi) => {
        this.likeVideo.nativeElement.classList.remove('colorBlue');
        this.video.likes = this.video.likes - 1;
        this.notificationService.notify(`Você removeu sua curtida`);
      }, (err) => {
          this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }


  createCurtida(video: string, token: string) {
    this.curtidaVideoService.createCurtida(video, token)
    .subscribe(
      (curtida: ResponseAPi) => {
        this.likeVideo.nativeElement.classList.add('colorBlue');
        this.video.likes = (this.video.likes + 1);
        this.notificationService.notify(`Você curtiu o vídeo :D`);
      }, (err) => {
        this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }

  calculaPorcentagem(video: Videos, like: boolean): number {
    const total = video.likes + video.dislikes;
    if (total === 0) {
      return 0;
    }

    if (like === true) {
      return Math.round((( video.likes / total) * 100));
    } else {
      return Math.round((( video.dislikes / total) * 100));
    }
  }
}
