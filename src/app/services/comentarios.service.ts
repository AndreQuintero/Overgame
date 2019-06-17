import { Comentarios } from './../models/comentarios';
import { Injectable } from '@angular/core';
import { ErrorHandler } from './../error-handler';
import { url } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPi } from '../models/responseApi';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {



  constructor(private http: HttpClient) { }

  getCommentsByVideoId(videoId: string, page: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/comentarios/${videoId}/${page}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  commentVideo(videoId: string, mensagem: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const obj = {
      video: { id: videoId},
      mensagem: mensagem
    };
    return this.http.post<Comentarios>(`${url}/unauthorized/comentarios/`, obj, httpOptions)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }
}
