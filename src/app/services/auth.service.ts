import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL, TOKEN_KEY } from '../const/const'; 

interface LoginRequest {  
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({  
  providedIn: 'root'
}) 
export class AuthService {
  private readonly loginUrl = `${API_URL}/auth/sign-in`;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> { 
    return this.http.post<LoginResponse>(this.loginUrl, data).pipe(
      tap((response) => { 
        localStorage.setItem(TOKEN_KEY, response.token); 
      })
    );
  }


  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
    isLoggedIn():boolean {
      const token = this.getToken();
      if (!token)return false;

      try {
        const [, payloadBase64] = token.split('.'); 
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp;

        return Date.now() < exp * 1000;
      } catch (error) {
        return false;
      }
    }
    logout(): void {
      localStorage.removeItem(TOKEN_KEY);
    }
 }   



