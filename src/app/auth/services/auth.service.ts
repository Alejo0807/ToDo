import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/auth';
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  signup(user: User) {
    const url = `${this.url}/new-user`;
    const body = user;

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      map( valid => valid.ok ),
      catchError( err => of(err.error.msg)) 
    );
  }

  login(email: string, password: string) {
    const url = `${this.url}/login`;
    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        console.log(resp);
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map( valid => valid.ok),
      catchError( err => of(err.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.url}/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        tap( resp => {
          console.log(resp);
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._user = {
              email : resp.email!
            }
          }
          return resp.ok;
        }),
        map( resp => resp.ok ),
        catchError( err => of(false))
      )
  }

  logout() {
    localStorage.removeItem('token')
  }

}
