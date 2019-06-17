import { Component, OnInit, Input } from '@angular/core';
import { Videos } from '../../models/videos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos-usuario-relacionado',
  templateUrl: './videos-usuario-relacionado.component.html',
  styleUrls: ['./videos-usuario-relacionado.component.css']
})
export class VideosUsuarioRelacionadoComponent implements OnInit {

  @Input() videosUsuarioRelacionado: Videos[];
  @Input() userName: string;
  @Input() userId: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  arrumaData(data: string): string {
    const date = new Date(data);
    const dataAtual = new Date();
    const ultimoDiaDoMes = this.retornaUltimoDiaDoMes(dataAtual.getMonth() + 1, dataAtual.getFullYear());
    const timeDiff = Math.abs(dataAtual.getTime() - date.getTime()); // me retorna milisegundos
    const segundos = Math.abs(timeDiff / 1000);
    const minutos = Math.abs(segundos / 60);
    const horas = Math.abs(minutos / 60);
    const dias = Math.abs(horas / 24);
    const mes = Math.abs(dias / ultimoDiaDoMes);
    const ano = Math.abs(mes / 12);

    if (segundos < 60) {
      return 'Agora mesmo';
    } else if (Math.round(minutos) < 60) {
      if (Math.round(minutos) === 1) {
        return Math.round(minutos) + ' minuto atrás';
      } else {
        return Math.round(minutos) + ' minutos atrás';
      }
    } else if (Math.round(horas) < 24) {
      if (Math.round(horas) === 1) {
        return Math.round(horas) + ' hora atrás';
      } else {
        return Math.round(horas) + ' horas atrás';
      }
    } else if (Math.round(dias) < ultimoDiaDoMes) {
      if ( Math.round(dias) === 1) {
        return Math.round(dias) + ' dia atrás';
      } else {
        return Math.round(dias) + ' dias atrás';
      }
    } else if (Math.round(mes) < 12) {
      if (Math.round(mes) === 1) {
        return Math.round(mes) + ' mês atrás';
      } else {
        return Math.round(mes) + ' meses atrás';
      }
    } else {
      if (ano === 1) {
        return Math.round(ano) + ' ano atrás';
      } else {
        return Math.round(ano) + ' anos atrás';
      }
    }
  }

  retornaUltimoDiaDoMes(mes: number, ano: number): number {
    const data = new Date(ano, mes, 0);
    return data.getDate();
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

  redirectToPerfil() {
    this.router.navigate([`perfil/${this.userId}`], {queryParams: {videos: 'maisVistos', page: 1}});
  }
}
