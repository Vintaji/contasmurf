import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  stock: any[""];

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }
  logout(): void {
    this.authService.removeToken();
    // Realize outras ações necessárias após o logout, como redirecionar para a página de login
  }
  ngOnInit(): void {
    this.apiService.getStock().subscribe((data) => {
      this.stock = data;
    });
  }
}
