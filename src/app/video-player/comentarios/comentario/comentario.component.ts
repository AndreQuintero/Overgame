import { Router } from '@angular/router';
import { ResponseAPi } from './../../../models/responseApi';
import { NotificationService } from './../../../services/notification.service';
import { DescurtidaComentarioService } from './../../../services/descurtida-comentario.service';
import { CurtidaComentarioService } from './../../../services/curtida-comentario.service';
import { UserLoggendIn } from './../../../models/userLoggedIn';
import { LikeDislike } from './../../../models/likeDislike';
import { Comentarios } from './../../../models/comentarios';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  @Input() comentario: Comentarios;

  @ViewChild('likeComment')
  likeComment: ElementRef;
  likeCommentFlag = false;
  likeCommentModel: LikeDislike;

  @ViewChild('dislikeComment')
  dislikeComment: ElementRef;
  dislikeCommentFlag = false;
  dislikeCommentModel: LikeDislike;

  constructor(private loginService: LoginService, private curtidaComentarioService: CurtidaComentarioService,
              private descurtidaComentarioService: DescurtidaComentarioService,
              private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {

    if (this.isLoggedIn()) {
       this.verificaLikeExiste(this.comentario.id);
    }
  }

  transformaData(texto): string {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const date = new Date(texto);

    return `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
  }
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  verificaLikeExiste(comentarioId) {
    this.curtidaComentarioService.getCurtida(comentarioId, this.userLoggendIn().token)
    .subscribe(
      (curtida: ResponseAPi) => {
        if (curtida.data !== null) {
          this.likeCommentModel = curtida.data;
          this.likeCommentFlag = true;
          this.likeComment.nativeElement.classList.add('colorBlue');
        } else {
          this.likeCommentModel = undefined;
          this.likeCommentFlag = false;
          this.likeComment.nativeElement.classList.remove('colorBlue');
        }
        this.verificaDislikeExiste(comentarioId);
      }
    );
  }
  verificaDislikeExiste(comentarioId) {
    this.descurtidaComentarioService.getDescurtida(comentarioId, this.userLoggendIn().token)
    .subscribe(
      (descurtida: ResponseAPi) => {
        if (descurtida.data !== null) {
          this.dislikeCommentModel = descurtida.data;
          this.dislikeCommentFlag = true;
          this.dislikeComment.nativeElement.classList.add('colorRed');
        } else {
          this.dislikeCommentModel = undefined;
          this.dislikeCommentFlag = false;
          this.dislikeComment.nativeElement.classList.remove('colorRed');
        }
      }
    );
  }

  likeOuDislike(likeOuDislike: string): void {
    if (this.isLoggedIn() === false) {
      if ( likeOuDislike === 'like') {
        this.notificationService.notify(`Faça o Login para curtir este comentário`);
      } else {
        this.notificationService.notify(`Faça o Login para descurtir este comentário`);
      }
    } else {
      if (likeOuDislike === 'like') {
        this.likeCommentFlag = !this.likeCommentFlag;
        if (this.likeCommentFlag === true) {
          this.createCurtidaComentario(this.comentario.id, this.userLoggendIn().token);
          if (this.dislikeCommentFlag === true) {
            this.dislikeCommentFlag = false;
            this.comentario.dislike = (this.comentario.dislike - 1);
            this.dislikeComment.nativeElement.classList.remove('colorRed');
          }
        } else {
          // se ele deletar a curtida
          this.deleteCurtida(this.comentario.id, this.userLoggendIn().token);
        }
      } else {
        this.dislikeCommentFlag = !this.dislikeCommentFlag;
        if (this.dislikeCommentFlag === true) {
            this.createDescurtidaComentario(this.comentario.id, this.userLoggendIn().token);
            if (this.likeCommentFlag === true) {
              this.likeComment.nativeElement.classList.remove('colorBlue');
              this.likeCommentFlag = false;
              this.comentario.like = (this.comentario.like - 1);
            }
        } else {
          this.deleteDescurtida(this.comentario.id, this.userLoggendIn().token);
        }
      }
    }
  }

  createCurtidaComentario(comentarioId: string, token: string) {
    this.curtidaComentarioService.createCurtida(comentarioId, token)
    .subscribe(
      (curtida) => {
        this.likeComment.nativeElement.classList.add('colorBlue');
        this.comentario.like = (this.comentario.like + 1);
        this.notificationService.notify(`Você curtiu este comentário`);
      }, (err) => {
        this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }

  createDescurtidaComentario(comentairoId: string, token: string) {
    this.descurtidaComentarioService.createDescurtida(comentairoId, token)
    .subscribe(
      (descurtida) => {
        this.dislikeComment.nativeElement.classList.add('colorRed');
        this.comentario.dislike = (this.comentario.dislike + 1);
        this.notificationService.notify(`Você descurtiu este comentário`);
      }, (err) => {
          this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
        }
    );
  }

  deleteCurtida(comentarioId: string, token: string) {
    this.curtidaComentarioService.deleteCurtida(comentarioId, token)
    .subscribe(
      (curtida: ResponseAPi) => {
        this.likeComment.nativeElement.classList.remove('colorBlue');
        this.comentario.like = (this.comentario.like - 1);
        this.notificationService.notify(`Você removeu sua curtida neste comentário`);
      }, (err) => {
        this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }

  deleteDescurtida(comentarioId: string, token: string) {
    this.descurtidaComentarioService.deleteDescurtida(comentarioId, token)
    .subscribe(
      (descurtida: ResponseAPi) => {
        this.dislikeComment.nativeElement.classList.remove('colorRed');
        this.comentario.dislike = (this.comentario.dislike - 1);
        this.notificationService.notify(`Você removeu sua descurtida neste comentário`);
      }, (err) => {
        this.notificationService.notify(`Algo deu errado, tente novamente mais tarde :(`);
      }
    );
  }

  redirectToPerfil() {
    this.router.navigate([`perfil/${this.comentario.usuarioComment.id}`], {queryParams: {videos: 'maisVistos', page: 1}});
  }
}
