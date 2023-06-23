import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-redefinirsenha',
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.css']
})
export class RedefinirsenhaComponent {
  token: string = '';
  novaSenha: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token);
    });
  }

  redefinirSenha() {
    const url = 'http://localhost:3000/api/redefinirsenha';

    const body = {
      token: this.token,
      novaSenha: this.novaSenha,
      email: this.email
    };    

    this.http.post(url, body)
      .subscribe(
        (response: any) => {
          console.log('Senha alterada com sucesso');
          alert('Senha alterada com sucesso');
        },
        (error: any) => {
          console.error('Erro ao redefinir a senha', error);
          alert('Erro ao redefinir a senha');
        }
      );
  }
}
