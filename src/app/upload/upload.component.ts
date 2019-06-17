import { Videos } from './../models/videos';
import { NotificationService } from './../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseAPi } from './../models/responseApi';
import { VideosServiceService } from './../services/videos-service.service';
import { UserLoggendIn } from './../models/userLoggedIn';
import { LoginService } from './../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('uploadInput')
  uploadInput: ElementRef;

  @ViewChild('videoPrev')
  videoPrev: ElementRef;

  @ViewChild('messageUpload')
  messageUpload: ElementRef;

  uploadForm: FormGroup;
  video: any;
  caminhoVideo: string;

  videoObj: Videos;
  constructor(private fb: FormBuilder, private loginService: LoginService, private videoService: VideosServiceService,
              private router: Router, private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    if ( this.activatedRoute.snapshot.queryParams['id'] === undefined) {
      this.uploadForm = this.fb.group({
        titulo: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        jogo: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
        descricao: this.fb.control('', [Validators.required, Validators.maxLength(300)]),
        video: this.fb.control('', [Validators.required])
      });
    } else {
      this.uploadForm = this.fb.group({
        id: this.fb.control(this.activatedRoute.snapshot.queryParams['id'], [Validators.required]),
        titulo: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        jogo: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
        descricao: this.fb.control('', [Validators.required, Validators.maxLength(300)])
      });
      this.getVideoById(this.activatedRoute.snapshot.queryParams['id']);
    }

  }

  uploadClick() {
    this.uploadInput.nativeElement.click();
  }

  uploadPrev(event) {
    if (event.target.files && event.target.files[0]) {
        this.video = event.target.files[0];
        const url = window.URL.createObjectURL(event.target.files[0]);
        this.videoPrev.nativeElement.style.display = 'block';
        this.videoPrev.nativeElement.src = url;
        this.messageUpload.nativeElement.style.display = 'none';
    }
  }

  userLoggedIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
  upload() {
    if (this.loggedIn()) {
      this.notificationService.notify(`Fazendo o upload...`);
      const formData = new FormData();
      formData.append('video', this.video);
      formData.append('titulo', this.uploadForm.get('titulo').value);
      formData.append('descricao', this.uploadForm.get('descricao').value);
      formData.append('jogo', this.uploadForm.get('jogo').value);
      this.uploadVideo(formData);
    }
  }

  uploadVideo(formData: FormData) {
    this.videoService.uploadVideo(formData, this.userLoggedIn().token)
    .subscribe(
      (video) => {
        this.notificationService.notify(`Upload de vídeo Feito com sucesso!`);
        this.router.navigate(['/'], {queryParams: {title: '', page: 1}});
      }, (err) => {
        this.notificationService.notify(`Ocorreu um erro, tente novamente mais tarde :(`);
      }
    );
  }

  getVideoById(videoId) {
    this.videoService.getVideosById(videoId).subscribe(
      (video) => {
       this.videoObj = video.data;
       this.uploadForm.controls['titulo'].setValue(video.data.titulo);
       this.uploadForm.controls['jogo'].setValue(video.data.nomeJogo);
       this.uploadForm.controls['descricao'].setValue(video.data.descricao);
      }
    );
  }

  isUpdate(): boolean {
    if (this.activatedRoute.snapshot.queryParams['id'] === undefined) {
      return false;
    }
    return true;
  }

  update() {
    this.videoService.updateVideo(this.uploadForm.get('id').value, this.uploadForm.get('titulo').value,
    this.uploadForm.get('jogo').value, this.uploadForm.get('descricao').value, this.userLoggendIn().token).subscribe(
      (video) => {
        console.log(video);
        this.notificationService.notify(`Atualizado com sucesso!`);
      }, (err) => {
        this.notificationService.notify(`Você Não tem permissão para fazer isso >:(`);
        this.router.navigate(['/']);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }
}
