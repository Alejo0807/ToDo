import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  

  constructor(private http: HttpClient) { }

  signup(user: User) {
    
    const url = 'http://localhost:8080/user/';
    const body = user;
    return this.http.post(url, body);
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
