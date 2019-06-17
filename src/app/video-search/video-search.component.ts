import { UserLoggendIn } from './../models/userLoggedIn';
import { LoginService } from './../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosServiceService } from './../services/videos-service.service';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Videos } from '../models/videos';
import { ResponseAPi } from '../models/responseApi';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {

  page = 0;
  count = 9;
  totalPages: number;
  titleView = '';
  videosArr: Videos[];
  url = this.router.url.split('?');
  perfil = false;
  @ViewChild('inputPag')
  inputPag: ElementRef;

  @ViewChild('inputSearch')
  inputSearch: ElementRef;
  pesquisaOuNormal = true;
  pesquisaTexto = '';

  @Input() userId: string;

  constructor(private videoService: VideosServiceService, private activatedRouter: ActivatedRoute,
              private router: Router, private loginService: LoginService) { }

  // inicia com os últimos vídeos postados
  ngOnInit() {


    this.activatedRouter.queryParams.subscribe(
      (params) => {
        let title = '';
        if (this.url[0] === '/') {
          title =  params['title'] || '';
        }
        this.page = params['page'] || 1;
        if (this.url[0] === '/') {
          this.pesquisaPorQual(title, this.page);
        } else if (this.url[0] === '/emAlta') {
          this.titleView = 'Em Alta';
          this.getEmAlta(this.page - 1, this.count);
        } else if (this.url[0] === '/liked') {
          this.titleView = 'Vídeos Curtidos';
          this.getVideosCurtidos(this.page - 1, this.count);
        } else {
    // aqui é o de usuário específico, deixo como else pq a rota é perfil/(numero do id) e só aí entra os queryParameters
        const url = params['videos'];
        this.perfil = true;
        this.count = 6;
        this.pesquisaPorQualPerfil(url);
        }
      }
    );

  }

  pesquisaPorQualPerfil( url ) {


   if (url === 'maisVistos') {
    this.getMostViewVideosByUserId(this.userId, this.page - 1, this.count);
   } else {
     this.getMostRecentlyVideosByUserId(this.userId, this.page - 1, this.count);
   }
  }

  pesquisaPorQual(title, page) {
    if (title === '') {
      this.getVideos(page - 1, this.count);
    } else {
      this.getVideosByTitle(title, page - 1, this.count);
    }
  }
  // chama o método de pegar os vídeos por últimos postados
  getVideos(page: number, count: number) {
    this.videoService.getVideos(page, count).
    subscribe(
      (videos: ResponseAPi) => {
      this.videosArr = videos.data.content;
      this.totalPages = videos.data.totalPages;
      console.log(videos.data.content);
      }
    );
    // verifica se foi pesquisado pelo input ou não, true significa que ele não foi pesquisado
    this.pesquisaOuNormal = true;
  }

  // busca últimos vídeos postados pelo valor do input
  getVideosByTitle(title: string, page: number, count: number) {
    this.videoService.getVideosByTitle(title, page, count).
    subscribe(
      (videos: ResponseAPi) => {
      this.videosArr = videos.data.content;
      this.totalPages = videos.data.totalPages;
      }
    );
  }

  getEmAlta(page: number, count: number) { // mudar api para receber titulo tbm
    this.videoService.getEmAlta(page, count).
    subscribe(
      (videos: ResponseAPi) => {
      this.videosArr = videos.data.content;
      this.totalPages = videos.data.totalPages;
      console.log(videos);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  getVideosCurtidos(page: number, count: number) {
    this.videoService.getLikedVideos(page, count, this.userLoggendIn().token).subscribe(
      (videos: ResponseAPi) => {
        this.videosArr = videos.data.content;
        this.totalPages = videos.data.totalPages;
        console.log(videos);
      }
    );
  }
  previousNextPageVideo(leftOrRight) {

    let page = this.page;
    if (leftOrRight === 'left') {
       page = page - 1;
    } else if ( leftOrRight === 'right') {
      page++;
    } else if (leftOrRight === 'botao') {
      page = this.inputPag.nativeElement.value;
    }

    this.redireciona(page);
  }

  redireciona(page: number) {
    if (this.url[0] === '/') {
      this.router.navigate(['/'], {queryParams: {title: this.inputSearch.nativeElement.value, page: page}});
    } else if (this.url[0] === '/emAlta') {
      this.router.navigate(['/emAlta'], {queryParams: {title: this.inputSearch.nativeElement.value, page: page}});
    } else if (this.url[0] === '/liked') {
      if (this.inputSearch.nativeElement.value === '') {
        this.router.navigate(['/liked'], {queryParams: {page: page}});
      } else {
        this.router.navigate(['/'], {queryParams: {title: this.inputSearch.nativeElement.value, page: page}});
      }
    } else { // perfil
      const urlNew = this.url[1].split('&');
     if (urlNew[0] === 'videos=maisVistos') {
      this.router.navigate([`perfil/${this.userId}`], {queryParams: {videos: 'maisVistos', page: page}});
     } else {
      this.router.navigate([`perfil/${this.userId}`], {queryParams: {videos: 'maisRecentes', page: page}});
     }
    }
  }

  // verifica se o número é divisível por 3, uso isso para dar um offset nos vídeos da primeira coluna
  divisivelPorTres(index: number): boolean {

    const indice = index + 1;
    if ( indice % 3 === 0) {

      return true;
    }
    return false;
  }


  getMostViewVideosByUserId(userId: string, page: number, count: number) {
    console.log('vistos');
    this.videoService.getVideosMostViewsByUserId(userId, page, count)
    .subscribe(
      (videos) => {
        this.videosArr = videos.data.content;
        this.totalPages = videos.data.totalPages;
        console.log(videos);
      }
    );
  }

  getMostRecentlyVideosByUserId(userId: string, page: number, count: number) {
    console.log('recente');
    this.videoService.getVideosRecentlyByUserId(userId, page, count)
    .subscribe(
      (videos) => {
        this.videosArr = videos.data.content;
        this.totalPages = videos.data.totalPages;
        console.log(videos);
      }
    );
  }
}
