import { ErrorHandler } from './../error-handler';
import { map, catchError } from 'rxjs/operators';
import { url } from './api';
import { Observable } from 'rxjs';
import { ResponseAPi } from './../models/responseApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescurtidaComentarioService {

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


  createDescurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    return this.http.post<ResponseAPi>(`${url}/unauthorized/descurtidaComentario`, {comentario: {id: comentarioId}}, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  getDescurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/unauthorized/descurtidaComentario/${comentarioId}`, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  deleteDescurtida(comentarioId: string, token: string): Observable<ResponseAPi> {
    return this.http.delete<ResponseAPi>(`${url}/unauthorized/descurtidaComentario/${comentarioId}`, this.getHeader(token))
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }
}
