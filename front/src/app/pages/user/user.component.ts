import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  logout(): void {
    this.authService.removeToken();
    // Realize outras ações necessárias após o logout, como redirecionar para a página de login
  }

  ngOnInit(): void {
  }

}
