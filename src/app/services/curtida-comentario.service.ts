import { Injectable } from '@angular/core';
import { ErrorHandler } from './../error-handler';
import { url } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPi } from '../models/responseApi';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurtidaComentarioService {

  constructor(private http: HttpClient) { }

  private getHeader(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }


  createCurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    return this.http.post<ResponseAPi>(`${url}/unauthorized/curtidaComentario`, {comentario: {id: comentarioId}}, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  getCurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    console.log('');
    return this.http.get<ResponseAPi>(`${url}/unauthorized/curtidaComentario/${comentarioId}`, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  deleteCurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    return this.http.delete<ResponseAPi>(`${url}/unauthorized/curtidaComentario/${comentarioId}`, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }
}
