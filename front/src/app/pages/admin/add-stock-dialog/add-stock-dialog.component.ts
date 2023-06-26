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
  elo: string | null = null;
  database: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService, private router: Router) {}

  adicionarEstoque(): void {
    if (!this.login || !this.senha || !this.ea || !this.nivel || !this.skins || !this.elo || !this.database) {
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
      database: this.database
    };

    let endpoint: string;

    // Defina o endpoint com base no banco de dados selecionado
    switch (this.database) {
      case 'Unraked':
        endpoint = 'http://localhost:3000/api/stock';
        break;
      case 'Elo':
        endpoint = 'http://localhost:3000/api/stockElo';
        break;
      case 'PBE':
        endpoint = 'http://localhost:3000/api/stockElo';
        break;
      default:
        // Caso nenhum banco de dados válido seja selecionado, exiba um erro ou faça qualquer outra ação necessária
        console.error('Banco de dados inválido');
        return;
    }

    this.http.post(endpoint, data, { headers }).subscribe(response => {
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

  fecharModal(): void {
    this.isModalVisible = false;
  }
}
