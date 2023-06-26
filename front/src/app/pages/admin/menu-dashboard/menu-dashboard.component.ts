import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent {
  constructor(
    private authService: AuthService,
  ) { }
  logout(): void {
    this.authService.removeToken();
    // Perform other necessary actions after logout, such as redirecting to the login page
  }
}
