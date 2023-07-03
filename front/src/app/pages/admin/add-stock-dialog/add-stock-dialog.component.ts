import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

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
  divisao: string | null = null;
  servidor: string | null = null;
  imagem: string = '';
  preco: number | null = null;

  private apiUrl = 'http://localhost:3000/api';
  private siteUrl = 'http://localhost:4200';

  constructor(private http: HttpClient, private authService: AuthService) {}

  adicionarEstoque(): void {
    if (!this.login || !this.senha || !this.ea || !this.nivel || !this.servidor || !this.elo || !this.divisao || !this.skins) {
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
      Authorization: `${token}`
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
      imagem: this.opcoesImagens[this.elo] || '',
      preco: this.preco
    };

    this.http.post(`${this.apiUrl}/stockElo`, data, { headers }).subscribe(
      response => {
        // Lógica a ser executada após o sucesso do POST
        console.log('Estoque adicionado com sucesso', response);
        alert('Estoque adicionado com sucesso');
        this.fecharModal();
        window.location.reload();
      },
      error => {
        // Lógica a ser executada em caso de erro no POST
        console.error('Erro ao adicionar estoque', error);
        alert('Estoque já registrado');
        this.fecharModal();
      }
    );
  }

  opcoesImagens: { [key: string]: string } = {
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
  }

  setPreco(): void {
    const precoMap: { [key: string]: number } = {
      'Ferro 4': 90,
      'Ferro 3': 80,
      'Ferro 2': 70,
      'Ferro 1': 40,
      'Bronze 4': 25,
      'Bronze 3': 25,
      'Bronze 2': 25,
      'Bronze 1': 25,
      'Prata 4': 20,
      'Prata 3': 20,
      'Prata 2': 20,
      'Prata 1': 20,
      'Ouro 4': 30,
      'Ouro 3': 30,
      'Ouro 2': 30,
      'Ouro 1': 30,
      'Platina 4': 45,
      'Platina 3': 45,
      'Platina 2': 50,
      'Platina 1': 55,
      'Esmeralda 4': 55,
      'Esmeralda 3': 55,
      'Esmeralda 2': 55,
      'Esmeralda 1': 55,
      'Diamante 4': 70,
      'Diamante 3': 75,
      'Diamante 2': 80,
      'Diamante 1': 85,
      'Mestre': 150,
      'Graomestre': 500,
      'Desafiante': 1000
    };
    
    if (this.elo === 'Mestre' || this.elo === 'Graomestre' || this.elo === 'Desafiante') {
      if (this.divisao === " ") {
        const key = this.elo;
        this.preco = precoMap[key] || null;
      } else {
        console.log('Apenas os elos "Mestre", "Grão-mestre" e "Desafiante" podem ter a opção "Sem divisão".');
        this.preco = null;
      }
    } else {
      const key = `${this.elo} ${this.divisao}`;
      this.preco = precoMap[key] || null;
    }
  
    if (this.preco === null) {
      console.log('Combinação de elo e divisão inválida. Preço não encontrado.');
    }
  }
  
onChangeElo(): void {
  console.log(this.elo);
  this.imagem = this.opcoesImagens[this.elo];
}

onChangeDivisao(): void {
  console.log(this.divisao);
  this.setPreco();
}

  fecharModal(): void {
    this.isModalVisible = false;
    this.setPreco();
  }
}
