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
export class DescurtidaVideoService {

  constructor(private http: HttpClient) { }

  createDescurtida(videoId: string, token: string): Observable<ResponseAPi> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.post<ResponseAPi>(`${url}/unauthorized/descurtidaVideo`, {video: {id: videoId}}, httpOptions )
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }

  getDescurtida(videoId: string, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.get<ResponseAPi>(`${url}/unauthorized/descurtidaVideo/${videoId}`, httpOptions )
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

    return this.http.delete<ResponseAPi>(`${url}/unauthorized/descurtidaVideo/${videoId}`, httpOptions )
    .pipe(
      map((res: any) => res,
      catchError((res: any) => ErrorHandler.onError(res)))
    );
  }
}
