import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  signup(user: User) {
    const body = user;
    return this.http.post(`${this.url}/new-user`, body);
  }

  auth(email: string, password: string) {
    const body = {email, password};
    return this.http.post(`${this.url}/login`,body);
  }

  // validateToken(): Observable<boolean> {
  //   const url = `${this.baseUrl}/api/auth/renew`;
  //   const headers = new HttpHeaders()
  //     .set('x-token', localStorage.getItem('token') || '')

  //   return this.http.get<AuthResponse>(url, {headers})
  //     .pipe(
  //       tap( resp => {
  //         if (resp.ok) {
  //           localStorage.setItem('token', resp.token!);
  //           this._user = {
  //             name: resp.name!,
  //             email: resp.email!,
  //             uid: resp.uid!
  //           }
  //         }
  //         return resp.ok;
  //       }),
  //       map( resp => resp.ok ),
  //       catchError( err => of(false))
  //     )
  // }

}
