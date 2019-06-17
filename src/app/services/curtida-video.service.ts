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
export class CurtidaVideoService {

  constructor(private http: HttpClient) { }

  createCurtida(videoId: string, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.post<ResponseAPi>(`${url}/unauthorized/curtidaVideo`, {video: {id: videoId}}, httpOptions)
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  getCurtida(videoId: string, token: string): Observable<ResponseAPi> {
    console.log('chegou aqui');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.get<ResponseAPi>(`${url}/unauthorized/curtidaVideo/${videoId}`, httpOptions)
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }


  deleteCurtida(videoId: string, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.delete<ResponseAPi>(`${url}/unauthorized/curtidaVideo/${videoId}`, httpOptions)
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }
}
