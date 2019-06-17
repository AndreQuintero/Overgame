import { Injectable } from '@angular/core';
import { ErrorHandler } from './../error-handler';
import { url } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPi } from '../models/responseApi';
import { catchError, map } from 'rxjs/operators';
import {Response} from '@angular/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) {}

  createUser(email: string, username: string, password: string): Observable<ResponseAPi> {
    return this.http.post<ResponseAPi>(`${url}/authorized/user`, {email: email, username: username, password: password}, this.httpOptions )
    .pipe(
      map((res: any) => res,
      catchError((res: Response) => ErrorHandler.onError(res))));
  }

  getUserById(id: string): Observable<ResponseAPi> {
    return this.http.get<ResponseAPi>(`${url}/authorized/user/${id}`)
    .pipe(
      map((res: any) => res,
      catchError((res: Response) => ErrorHandler.onError(res))));
  }

  updateUser(formData: FormData, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.put<ResponseAPi>(`${url}/unauthorized/user`, formData, httpOptions)
    .pipe(
      map((res: any) => res,
      catchError((res: Response) => ErrorHandler.onError(res)))
    );

  }
}
