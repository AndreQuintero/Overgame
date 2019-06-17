import { ErrorHandler } from './../error-handler';
import { Injectable } from '@angular/core';
import { url } from './api';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPi } from '../models/responseApi';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosServiceService {

  constructor(private http: HttpClient) { }

  getVideos(page: number, count: number): Observable<ResponseAPi> {

    return this.http.get<ResponseAPi>(`${url}/authorized/video/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getVideosByTitle(titulo: string, page: number, count: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/${titulo}/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getVideosById(id: string): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/${id}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getVideosByUserId(idUser: string, page: number, count: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/userDate/${idUser}/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getEmAlta(page: number, count: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/EmAlta/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getVideosMostViewsByUserId(userId: string, page: number, count: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/userViews/${userId}/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getVideosRecentlyByUserId(userId: string, page: number, count: number): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/video/userDate/${userId}/${page}/${count}`)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  uploadVideo( formData: FormData, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<ResponseAPi>(`${url}/unauthorized/video`, formData, httpOptions)
    .pipe(
      catchError(ErrorHandler.handleError)
    );

  }
  updateVideo(id: string, titulo: string, nomeJogo: string, descricao: string, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };

    return this.http.put<ResponseAPi>
    (`${url}/unauthorized/video`, {id: id, titulo: titulo, nomeJogo: nomeJogo, descricao: descricao}, httpOptions)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  deleteVideo(id: string, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };

    return this.http.delete<ResponseAPi>(`${url}/unauthorized/video/${id}`, httpOptions)
    .pipe(
      catchError(ErrorHandler.handleError)
    );

  }

  getLikedVideos(page: number, count: number, token: string): Observable<ResponseAPi> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };

    return this.http.get<ResponseAPi>(`${url}/unauthorized/video/LikedVideo/${page}/${count}`, httpOptions)
    .pipe(
      catchError(ErrorHandler.handleError)
    );

  }
}
