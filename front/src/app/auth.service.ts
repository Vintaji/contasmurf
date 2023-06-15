import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'token';
  private groupKey = 'group';
  private allowedRolesKey = 'allowedRoles';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login Response:', response);
        const token = response.token;
        const userGroup = response.group;
        this.setToken(token);
        this.setUserGroup(userGroup);
        this.getAllowedRoles();
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenData = this.parseJwt(token);
      return tokenData && tokenData.exp && tokenData.exp > Date.now() / 1000;
    }
    return false;
  }

  setUserGroup(group: string): void {
    localStorage.setItem(this.groupKey, group);
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  setAllowedGroups(groups: string[]): void {
    localStorage.setItem(this.allowedRolesKey, JSON.stringify(groups));
  }

  getAllowedRoles(): string[] {
    const groupsString = localStorage.getItem(this.allowedRolesKey);
    const groups: string[] | null = groupsString ? JSON.parse(groupsString) : null;
    return groups || [];
  }

  getUserGroup(): Observable<string> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get<any>(`${this.apiUrl}/user/group`, { headers }).pipe(
      map(response => response.group)
    );
  }
}
