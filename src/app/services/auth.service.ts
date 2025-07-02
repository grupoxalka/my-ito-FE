import { inject, Injectable } from '@angular/core';
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
  private httpClient = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> { 
    const loginUrl = `${API_URL}/auth/sign-in`;
    return this.httpClient.post<LoginResponse>(loginUrl, data).pipe(
      tap((response) => {
        localStorage.setItem(TOKEN_KEY, response.token); 
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    const url = `${API_URL}/auth/forgot-password`;
    return this.httpClient.post<any>(url, data);
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



