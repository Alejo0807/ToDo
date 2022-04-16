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

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.baseUrl}/labels`);
  }
  
  updateLabels(labels: Label[]): Observable<Label[]> {
    const body = labels;
    return this.http.put<Label[]>(`${this.baseUrl}/labels`, body);
  }
}
