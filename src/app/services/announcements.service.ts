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

  getAnnouncements(token: string, pageNumber: number = 0, pageSize: number = 5): Observable<any> {
    const url = API_URL + '/advertisements';
    const headers = this.createHeaders(token);

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(url, { headers, params });
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

}