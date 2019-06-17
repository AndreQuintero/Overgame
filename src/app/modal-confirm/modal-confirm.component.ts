import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { UserLoggendIn } from './../models/userLoggedIn';
import { VideosServiceService } from './../services/videos-service.service';
import { timer } from 'rxjs';
import { NotificationService } from './../services/notification.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
  animations: [
    trigger('modal-visibility', [
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      state('visible', style({
        opacity: 1,
        display: 'block'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class ModalConfirmComponent implements OnInit {

  modalVisibility = 'hidden';
  message = '';
  id: string;
  acaoFunction: string;
  tr: ElementRef;
  constructor(private notificationService: NotificationService, private videoService: VideosServiceService,
  private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.notificationService.notifierModal.subscribe(
      (message) => {
        this.message = message;
        this.modalVisibility = 'visible';
        this.notificationService.idNotifier.subscribe(
          (id) => {
           this.id = id;
           this.notificationService.acaoNotifier.subscribe(
             (acao) => {
              this.acaoFunction = acao;
              this.notificationService.elementNotifier.subscribe(
                (tr) => {
                  this.tr = tr;
                  console.log(this.tr);
                }
              );
             }
           );
          }
        );
      }
    );
  }

  fechaModal() {
    this.modalVisibility = 'hidden';
  }

  acao() {
    switch (this.acaoFunction) {
      case 'deleteVideo': {
          this.deleteVideo();
        break;
      }
    }
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }
  deleteVideo() {
    this.videoService.deleteVideo(this.id, this.userLoggendIn().token).subscribe(
      (video) => {
        this.notificationService.notify(`Vídeo excluido com sucesso.`);
        this.fechaModal();
        // this.tr.nativeElement.style.opacity = 0;
       // this.tr.nativeElement.style.display = 'none';

      }, (err) => {
        this.notificationService.notify(`Tente novamente mais tarde`);
        this.fechaModal();
      }

    );
  }
}
