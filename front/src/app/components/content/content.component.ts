import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent {
  constructor(private apiService: ApiService) {}
  adicionarAoCarrinho() {
    const item = {
      userId: localStorage.getItem('userId') || '',
      name: 'Conta Unraked - LVL 30',
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: 10,
      quantity: 1
    };
  
    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }
  adicionarAoCarrinhoPBE() {
    const item = {
      userId: localStorage.getItem('userId') || '',
      name: 'Conta PBE',
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: 10,
      quantity: 1
    };
  
    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }
  
  adicionarAoCarrinhoAssinatura() {
    const item = {
      userId: localStorage.getItem('userId') || '',
      name: 'Assinatura',
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: 50,
      quantity: 1
    };
  
    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }

  adicionarAoCarrinhoTrocarNome() {
    const item = {
      userId: localStorage.getItem('userId') || '',
      name: 'Trocar nome',
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: 10,
      quantity: 1
    };
  
    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }
}
