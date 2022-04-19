import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Label } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLabelsByUserId(userId: number): Observable<Label[]> {
    const params = { userId }
    return this.http.get<Label[]>(`${this.baseUrl}/labels`, { params });
  }
  
  updateLabels(labels: Label[]): Observable<Label[]> {
    const body = [labels[0],labels[1],labels[2],labels[3]];
    return this.http.put<Label[]>(`${this.baseUrl}/labels`, body);
  }
}
