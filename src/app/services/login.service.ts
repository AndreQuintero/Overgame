import { UserLoggendIn } from './../models/userLoggedIn';
import { Injectable } from '@angular/core';
import { ErrorHandler } from './../error-handler';
import { url } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPi } from '../models/responseApi';
import { catchError, map, tap } from 'rxjs/operators';
import {Response} from '@angular/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<UserLoggendIn> {
    return this.http.post<UserLoggendIn>(`${url}/authorized/`, {email: email, password: password}, this.httpOptions)
    .pipe(
        tap(user => sessionStorage.setItem('user', JSON.stringify(user))),
        map((res: any) => res,
        catchError((res: Response) => ErrorHandler.onError(res))));
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === undefined) {
      return false;
    } else {
      return true;
    }

  }

  userLoggedIn(): UserLoggendIn {
    if (this.isLoggedIn() === true) {
        const userLoggedIn = JSON.parse(sessionStorage.getItem('user'));
        return userLoggedIn;
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
