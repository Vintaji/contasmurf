import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock-dialog',
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.css']
})
export class AddStockDialogComponent {
  isModalVisible: boolean = true;
  login: string | null = null;
  senha: string | null = null;
  ea: number | null = null;
  nivel: number | null = null;
  skins: string | null = null;
  elo: string = '';
  divisao: number | null = null;
  servidor: string | null = null;
  imagem: string = '';

  private apiUrl = 'http://localhost:3000/api';
  private siteUrl = 'http://localhost:4200';

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService, private router: Router) {}

  adicionarEstoque(): void {
    if (!this.login || !this.senha || !this.elo || !this.divisao ) {
      // Um ou mais campos obrigatórios estão vazios
      console.error('Preencha todos os campos obrigatórios');
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    // Obtém o token de autorização do serviço de autenticação
    const token = this.authService.getToken();

    // Define os cabeçalhos da solicitação incluindo o token de autorização
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "" + token
    });

    const data = {
      login: this.login,
      senha: this.senha,
      ea: this.ea,
      nivel: this.nivel,
      skins: this.skins,
      elo: this.elo,
      divisao: this.divisao,
      servidor: this.servidor,
      imagem: this.opcoesImagens[this.elo] || ''
    };

    this.http.post(`${this.apiUrl}/stockElo`, data, { headers }).subscribe(response => {
      // Lógica a ser executada após o sucesso do POST
      console.log('Estoque adicionado com sucesso', response);
      alert('Estoque adicionado com sucesso');
      this.fecharModal();
      window.location.reload();
    }, error => {
      // Lógica a ser executada em caso de erro no POST
      console.error('Erro ao adicionar estoque', error);
      alert('Estoque já registrado');
      this.fecharModal();
    });
  }

  opcoesImagens: { [key: string]: string } = {
    Unraked: this.siteUrl + '/assets/png/unraked.webp',
    Ferro: this.siteUrl + '/assets/png/ferro.webp',
    Bronze: this.siteUrl + '/assets/png/bronze.webp',
    Prata: this.siteUrl + '/assets/png/prata.webp',
    Ouro: this.siteUrl + '/assets/png/ouro.webp',
    Platina: this.siteUrl + '/assets/png/platina.webp',
    Esmeralda: this.siteUrl + '/assets/png/unraked.webp',
    Diamante: this.siteUrl + '/assets/png/diamante.webp',
    Mestre: this.siteUrl + '/assets/png/mestre.webp',
    Graomestre: this.siteUrl + '/assets/png/graomestre.webp',
    Desafiante: this.siteUrl + '/assets/png/desafiante.webp'
  };

  onChangeElo(): void {
    // Obtém o caminho da imagem associada à opção selecionada
    this.imagem = this.opcoesImagens[this.elo];
  }

  fecharModal(): void {
    this.isModalVisible = false;
  }
}
