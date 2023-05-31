import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }


  // Validaciones por si existe el usuario
  signup(user: any) {
    const url = `${this.baseUrl}/auth/new-user`;
    const body = user;

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      map( valid => valid.ok ),
      catchError( err => of(err.error.msg)) 
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
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
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        tap( resp => {
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

  forgotPassword(email: string): Observable<Response> {
    const url = `${this.baseUrl}/auth/forgot-password`;
    const body = email;

    return this.http.post<Response>(url, body);
  }

  forgotPasswordValidateToken(token: string): Observable<Response> {
    const url = `${this.baseUrl}/auth/forgot-password?token=${ token }`;
    
    return this.http.get<Response>(url);
  }

  resetPassword(token: string, password: string): Observable<Response> {
    const url = `${this.baseUrl}/auth/reset-password?token=${ token }`;
    const body = {password};

    return this.http.post<Response>(url, body);
  }
}
