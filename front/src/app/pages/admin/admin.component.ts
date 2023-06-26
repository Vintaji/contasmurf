import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Component properties
  constructor(
    private authService: AuthService,
  ) { }

  // Logout method
  logout(): void {
    this.authService.removeToken();
  }
}
