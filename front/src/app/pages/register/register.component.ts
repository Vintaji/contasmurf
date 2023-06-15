import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      // Exibir uma mensagem de erro informando que as senhas não coincidem
      alert("As senhas não coincidem");
      return;
    }

    const newUser = { username: this.username, password: this.password, email: this.email };
    this.http.post('http://localhost:3000/api/register', newUser).subscribe(
      (response: any) => {
        console.log(response.message);
        // Redirecionar para a página de login ou exibir uma mensagem de sucesso
        alert("Usuário cadastrado com sucesso");
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
        alert("E-mail ou usuario já registrado");
      }
    );
  }
}
