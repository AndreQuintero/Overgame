import { UserLoggendIn } from './../../models/userLoggedIn';
import { LoginService } from './../../services/login.service';
import { ComentariosService } from './../../services/comentarios.service';
import { Comentarios } from './../../models/comentarios';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() comentariosPai: Comentarios[];
  @Input() totalPagesComment: number;
  @Input() videoPaiId: string;


  page = 0;
  totalPages: number;

  constructor(private comentariosService: ComentariosService) { }

  ngOnInit() {
    this.totalPages = this.totalPagesComment;
  }

  changePageComments(page: number, leftRight: string): void {
    if ( leftRight === 'left') {
      if (page - 1 < 0) {
        console.log('fazer animação de block');
      } else {
        // quer dizer que ele vai voltar uma página
        this.page = page - 1;
        this.getComments(this.videoPaiId, this.page);
      }
    } else {
      if (page + 1 >= this.totalPages) {
        console.log('fazer animação de block') ;
      } else {
        // quer dizer que ele vai avancar uma página
        this.page = page + 1;
        this.getComments(this.videoPaiId, this.page);
      }
    }
  }

  getComments(videoId: string, page: number): void {
    this.comentariosService.getCommentsByVideoId(videoId, page).subscribe((comentarios) => {
      this.comentariosPai = comentarios.data;
    });
  }

  totalPagesInput(totalPages): number {
    if (totalPages === 0) {
      return 1;
    } else {
      return totalPages;
    }
  }

}
