import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // can't fix User[] for generic
  getAllUsers(page: number): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}/user/${page}/10`)
      .pipe(delay(1000));
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/${id}`).pipe(delay(1000));
  }

  getUserFriends(id: number, page: number): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}/user/${id}/friends/${page}/10`)
      .pipe(delay(1000));
  }
}
