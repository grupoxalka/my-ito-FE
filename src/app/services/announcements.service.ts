import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/const';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementsService {
  private httpClient = inject(HttpClient);

  createAnnouncement(token: string, announcementData: any, userId: string): Observable<any> {
    const url = `${API_URL}/advertisements/${userId}`;
    const headers = this.createHeaders(token);

    return this.httpClient.post(url, announcementData, {headers} );
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

}