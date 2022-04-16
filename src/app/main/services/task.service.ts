import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseMessage, Task } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskSerivce {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTasksBySectionId(sectionId: number): Observable<Task[]> {
    const params = { sectionId };
    return this.http.get<Task[]>(`${this.baseUrl}/task/list/`, { params });
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/task/${taskId}`);
  }

  saveTask(sectionId: number, task: Task): Observable<Task> {
    const body = task;
    return this.http.post<Task>(`${this.baseUrl}/task/save/${sectionId}`, body);
  }

  deleteTask(userId: number, taskId: number): Observable<ResponseMessage> {
    const params = { taskId };
    return this.http.post<ResponseMessage>(`${this.baseUrl}/task/delete/${userId}`, { params });
  }
}
