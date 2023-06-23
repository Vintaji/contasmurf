import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent {
  email: string = '';

  constructor(
    private http: HttpClient,
  ) { }
  enviarEmail() {
    const url = 'http://localhost:3000/api/recuperarsenha'; // Rota do backend que lida com o envio de e-mail

    const body = {
      email: this.email,
    };

    this.http.post(url, body)
      .subscribe(
        (        response: any) => {
          console.log('E-mail enviado com sucesso');
          // Faça algo após o envio do e-mail, como exibir uma mensagem de sucesso
          alert('E-mail enviado com sucesso');
        },
        (        error: any) => {
          console.error('Erro ao enviar o e-mail', error);
          // Trate o erro adequadamente, como exibindo uma mensagem de erro ao usuário
          alert('Erro ao enviar o e-mail');
        }
      );
  }
}

