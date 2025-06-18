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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(url, { headers, params });
  }

  // This method is used temporaly to sign in a user with hardcoded credentials
  signIn(): Observable<any> {
    const url = API_URL + '/auth/sign-in';
    const body = {
      email: 'daniel.herrandez@gmail.com',
      password: 'password'
    };

    return this.httpClient.post<any>(url, body);
  }

  createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  addUser(token: string, userData: any): Observable<any> {
    return this.httpClient.post(
      `${API_URL}/users/registry`,
      userData,
      { headers: this.createHeaders(token) }
    );
  }
}