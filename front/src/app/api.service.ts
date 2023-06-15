import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `${token}`);
    }
    return headers;
  }

  getStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock`, { headers: this.getHeaders() });
  }

  getLogin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/login`, { headers: this.getHeaders() });
  }

  postLogin(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/login`, { headers: this.getHeaders() });
  }

  getUserGroup(): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/user/group`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.group)
      );
  }
}
