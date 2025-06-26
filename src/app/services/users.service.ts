import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/const';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  httpClient = inject(HttpClient);
  getUsers(token: string, pageNumber: number = 0, pageSize: number = 5): Observable<any> {
    const url = API_URL + '/users';
    const headers = this.createHeaders(token);

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(url, { headers, params });
  }

  searchUsers(token: string, name: string, pageNumber: number = 0, pageSize: number = 5): Observable<any> {
    const url = API_URL + '/users/search';
    const headers = this.createHeaders(token);

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set("fullName", name)

    return this.httpClient.get<any>(url, { headers, params });
  }

  addUser(token: string, userData: any): Observable<any> {
    return this.httpClient.post(
      `${API_URL}/users/registry`,
      userData,
      { headers: this.createHeaders(token) }
    );
  }

  deleteUser(token: string, userId: string): Observable<any> {
    const url = `${API_URL}/users/${userId}`;
    const headers = this.createHeaders(token);
    return this.httpClient.delete<any>(url, { headers });
  }

  updateUser(token: string, userId: string, userData: Partial<any>): Observable<any> {
    return this.httpClient.put(
      `${API_URL}/users/modify/${userId}`,
      userData,
      { headers: this.createHeaders(token) }
    );
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

}