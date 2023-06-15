import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }
  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        const token = response.token; // supondo que o token seja retornado como "token" no corpo da resposta
        this.authService.setToken(token);
        alert("Usuário logado com sucesso");
        // Redirecionar ou realizar outras ações após o login bem-sucedido
        this.router.navigate(['/user']);
      },
      (error) => {
        // Tratar erros de login
        alert("Usuário ou senha inválidos");
      }
    );
  }
}
