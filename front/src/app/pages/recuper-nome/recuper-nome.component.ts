import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-recuper-nome',
  templateUrl: './recuper-nome.component.html',
  styleUrls: ['./recuper-nome.component.css']
})
export class RecuperNomeComponent {
  nome: string = '';
  senha: string = '';
  email: string = '';
  tentativa: boolean = false;
  pix: string = '';

  constructor(
      private http: HttpClient,
      private authService: AuthService
    ) { }

  enviarEmail() {
    const url = 'http://localhost:3000/api/recuperarnome'; // Rota do backend que lida com o envio de e-mail

    const tentativaTexto = this.tentativa ? 'Marcado' : 'Desmarcado';

    const body = {
      to: 'recuperar@contasmurf.com',
      from: 'recuperar@contasmurf.com',
      subject: 'Conta Smurf - Recuperação de Nome',
      text: `Nick: ${this.nome}\nSenha: ${this.senha}\nE-mail: ${this.email}\nPix: ${this.pix}\nTermos: ${tentativaTexto}`,
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `${this.authService.getToken()}`); // Adicione o cabeçalho de autorização
      
    this.http.post(url, body, {headers})
      .subscribe(
        response => {
          console.log('E-mail enviado com sucesso');
          // Faça algo após o envio do e-mail, como exibir uma mensagem de sucesso
          alert('E-mail enviado com sucesso');
        },
        error => {
          console.error('Erro ao enviar o e-mail', error);
          // Trate o erro adequadamente, como exibindo uma mensagem de erro ao usuário
          alert('Erro ao enviar o e-mail');
        }
      );
  }
}