import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMessage, Section } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSections(userId: number): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.baseUrl}/section/list/${userId}`);
  }

  getSectionById(sectionId: number): Observable<Section> {
    return this.http.get<Section>(`${this.baseUrl}/section/${sectionId}`);
  }

  saveSection(userId: number, section: Section): Observable<Section> {
    const body = section;
    return this.http.post<Section>(`${this.baseUrl}/section/save/${userId}`, body);
  }

  deleteSection(userId: number, sectionId: number): Observable<ResponseMessage> {
    const params = { sectionId };
    return this.http.post<ResponseMessage>(`${this.baseUrl}/section/delete/${userId}`, { params });
  }

}
