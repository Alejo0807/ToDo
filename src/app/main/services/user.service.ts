import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserByToken(): Observable<User> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
    return this.http.get<User>(`${this.baseUrl}/user`, { headers });
  }

}
