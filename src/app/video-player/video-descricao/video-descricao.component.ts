import { Router } from '@angular/router';
import { Videos } from './../../models/videos';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-descricao',
  templateUrl: './video-descricao.component.html',
  styleUrls: ['./video-descricao.component.css']
})
export class VideoDescricaoComponent implements OnInit {

  @Input() videoPai: Videos;
  descricao = '';
  verMais = true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.descricao = this.videoPai.descricao;
    this.verMais = true;
  }

  ocultaVerMais(): void {
    this.verMais = !this.verMais;
    if (this.verMais === true) {
      this.descricao = this.videoPai.descricao;
    } else {
      this.descricao = '';
    }
  }

  transformaData(texto): string {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const date = new Date(texto);

    return `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
  }

  redirectToPerfil() {
    this.router.navigate([`perfil/${this.videoPai.user.id}`], {queryParams: {videos: 'maisVistos', page: 1}});
  }
}


