import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}


  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  addTask(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }


  toggleTask(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {});
  }


  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
