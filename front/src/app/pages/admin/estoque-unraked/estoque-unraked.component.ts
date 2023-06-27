import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-estoque-unraked',
  templateUrl: './estoque-unraked.component.html',
  styleUrls: ['./estoque-unraked.component.css']
})
export class EstoqueUnrakedComponent implements OnInit {
  stock: any[] = []; // Array to hold stock data
  objetosConvertidos: any[] = []; // Array to hold the converted objects
  textoInput: string = ''; // Input for the text with account information
  currentPage = 1; // Current page for stockElo pagination
  itemsPerPage = 10; // Number of items per page for stockElo

  constructor(private apiService: ApiService) { }

  converterTexto() {
    const linhas = this.textoInput.split('\n');
    const objetos = [];
    let objeto: any = null;

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i].trim();

      if (linha.startsWith('Login:')) {
        objeto = {};
        objetos.push(objeto);

        const login = linha.split(':')[1].trim();
        objeto.login = login;
      } else if (linha.startsWith('Senha:')) {
        const senha = linha.split(':')[1].trim();
        objeto.senha = senha;
      } else if (linha.startsWith('Essencia azul:')) {
        const essenciaAzul = parseInt(linha.split(':')[1].trim());
        objeto.ea = essenciaAzul;
      } else if (linha.startsWith('Nivel:')) {
        const nivel = parseInt(linha.split(':')[1].trim());
        objeto.nivel = nivel;
      } else if (linha.startsWith('Skins:')) {
        const skins = linha.split(':')[1].trim();
        if (skins.length > 0) {
          objeto.skins = skins;
        } else {
          objeto.skins = 'Sem skins';
        }
      }
    }

    // Verificar se os campos obrigatórios estão presentes em cada objeto
    const camposObrigatorios = ['login', 'senha', 'ea', 'nivel' , 'skins'];
    const objetosValidos = objetos.filter((objeto) => {
      const camposFaltantes = camposObrigatorios.filter((campo) => !objeto.hasOwnProperty(campo));
      if (camposFaltantes.length > 0) {
        console.error('Campos obrigatórios faltando:', camposFaltantes);
        return false;
      }
      return true;
    });

    // Adicionar propriedades adicionais aos objetos válidos
    objetosValidos.forEach((objeto) => {
      objeto.servidor = 'BR';
    });

    this.objetosConvertidos = objetosValidos;

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
      this.apiService.getStock().subscribe((data: any[]) => {
        this.stock = data;
      });
      return;
    }

    const objeto = this.objetosConvertidos[index];

    this.apiService.postStock(objeto).subscribe(response => {
      console.log('Objeto adicionado com sucesso', response);
      // Chamar a próxima iteração para enviar o próximo objeto
      this.enviarObjeto(index + 1);
    }, error => {
      console.error('Erro ao adicionar objeto', error);
      alert('Estoque já adicionado');
    });
  }

  removeStock(index: number, stockId: string) {
    this.apiService.delStock(stockId).subscribe(() => {
      this.stock.splice(index, 1);
      alert('Item removido do estoque');
    }, (error: any) => {
      console.error('Erro ao remover item do estoque Unraked', error);
    });
  }

  replaceCommasWithNewlines(str: string): string {
    return str.replace(/,/g, '\n');
  }

  ngOnInit(): void {
    this.apiService.getStock().subscribe((data: any[]) => {
      this.stock = data;
    });
  }
}
