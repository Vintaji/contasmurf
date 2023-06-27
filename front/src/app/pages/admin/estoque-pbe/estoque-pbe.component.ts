import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material/dialog';

interface ObjetoEstoque {
  login: string;
  senha: string;
  servidor: string; // Campo adicionado para o servidor
}

@Component({
  selector: 'app-estoque-pbe',
  templateUrl: './estoque-pbe.component.html',
  styleUrls: ['./estoque-pbe.component.css']
})
export class EstoquePbeComponent implements OnInit {
  stockPBE: any[] = []; // Array to hold stockPBE data
  objetosConvertidos: ObjetoEstoque[] = []; // Array to hold the converted objects
  textoInput: string = ''; // Input for the text with account information
  currentPagePBE = 1; // Current page for stockPBE pagination
  itemsPerPagePBE = 10; // Number of items per page for stockPBE

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  logout(): void {
    this.authService.removeToken();
    // Perform other necessary actions after logout, such as redirecting to the login page
  }

  converterTexto() {
    const linhas = this.textoInput.split('\n');
    const objetos: ObjetoEstoque[] = [];

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i].trim();

      if (linha.startsWith('PBE:')) {
        const campos = linha.split(':');
        const objeto: ObjetoEstoque = {
          login: campos[1].trim(),
          senha: campos[2].trim(),
          servidor: 'PBE' // Valor 'PBE' definido para o campo servidor
        };
        objetos.push(objeto);
      }
    }

    this.objetosConvertidos = objetos;

    // Verificar se há objetos válidos antes de fazer o post
    if (this.objetosConvertidos.length > 0) {
      this.adicionarEstoque();
    } else {
      console.error('Nenhum objeto válido encontrado');
      alert('Nenhum objeto válido encontrado');
    }
  }

  adicionarEstoque() {
    if (this.objetosConvertidos.length === 0) {
      console.error('Preencha o payload do estoque');
      alert('Preencha o payload do estoque');
      return;
    }

    this.enviarObjeto(0);
  }

  enviarObjeto(index: number) {
    if (index >= this.objetosConvertidos.length) {
      // Todos os objetos foram enviados
      console.log('Estoque adicionado com sucesso');
      alert('Estoque adicionado com sucesso');
      this.textoInput = '';
      this.apiService.getStockPBE().subscribe((data: any[]) => {
        this.stockPBE = data;
      });
      return;
    }

    const objeto = this.objetosConvertidos[index];

    this.apiService.postStockPBE(objeto).subscribe(response => {
      console.log('Objeto adicionado com sucesso', response);
      // Chamar a próxima iteração para enviar o próximo objeto
      this.enviarObjeto(index + 1);
    }, error => {
      console.error('Erro ao adicionar objeto', error);
      alert('Estoque já adicionado');
    });
  }

  removeStockPBE(index: number, stockId: string) {
    this.apiService.delStockPBE(stockId).subscribe(() => {
      this.stockPBE.splice(index, 1);
      alert('Item removido do estoque');
    }, (error) => {
      console.error('Erro ao remover item do estoque PBE', error);
    });
  }

  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStockPBE().subscribe((data) => {
      this.stockPBE = data;
    });
  }
}
