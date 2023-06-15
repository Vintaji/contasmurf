import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const tokenData = this.authService.parseJwt(token);
    const userGroup = tokenData?.group;

    return this.authService.getUserGroup().pipe(
      map((allowedRoles: string) => {
        if (allowedRoles.toLowerCase() === userGroup.toLowerCase()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
