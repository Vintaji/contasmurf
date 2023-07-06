import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.css']
})
export class ShoplistComponent implements OnInit {
  stockElo: any[] = []; // Array to hold stockElo data
  currentPageElo = 1; // Current page for stockElo pagination
  itemsPerPageElo = 9; // Number of items per page for stockElo
  filteredStockElo: any[] = [];  // Array que armazenará os dados filtrados por elo
  filteredStockDivisao: any[] = [];  // Array que armazenará os dados filtrados por elo
  selectedElo: string = '';  // Elo selecionado para filtro
  selectedDivisao: string = '';  // Elo selecionado para filtro
  selectedOrdenacao: string = '';  // Ordenação selecionada


  constructor(private apiService: ApiService, private router: Router) {}

  filtrarStockElo(): void {
    if (this.selectedElo) {
      this.filteredStockElo = this.stockElo.filter(item => item.elo.toLowerCase() === this.selectedElo.toLowerCase());
    } else {
      this.filteredStockElo = [...this.stockElo];
    }
  }
  
  filtrarStockDivisao(): void {
    if (this.selectedDivisao) {
      this.filteredStockDivisao = this.filteredStockElo.filter(item => item.divisao.toLowerCase() === this.selectedDivisao.toLowerCase());
    } else {
      this.filteredStockDivisao = [...this.filteredStockElo];
    }
  }
  
  filtrarStock(): void {
    this.filtrarStockElo();
    this.filtrarStockDivisao();
    this.filtrarStockOrdenacao();
  }

  getStockFilteredByEloDivisao(): any[] {
    let filteredStock = this.stockElo;
  
    if (this.selectedElo) {
      filteredStock = filteredStock.filter(item => item.elo.toLowerCase() === this.selectedElo.toLowerCase());
    }
  
    if (this.selectedDivisao) {
      filteredStock = filteredStock.filter(item => item.divisao.toLowerCase() === this.selectedDivisao.toLowerCase());
    }
  
    return filteredStock;
  }  

  filtrarStockOrdenacao(): void {
    if (this.selectedOrdenacao === 'ascendente') {
      this.filteredStockDivisao.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
    } else if (this.selectedOrdenacao === 'descendente') {
      this.filteredStockDivisao.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco));
    }
  }

  adicionarAoCarrinho() {
    const item = {
      userId: localStorage.getItem('userId') || '',
      name: 'Conta Unraked',
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: 10,
      quantity: 1
    };

    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
        this.router.navigate(['/cart']);
        window.location.reload();
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
      price: 20,
      quantity: 1
    };
  
    this.apiService.addToCart(item).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
        this.router.navigate(['/cart']);
        window.location.reload();
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
        this.router.navigate(['/cart']);
        window.location.reload();
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }

  adicionarAoCarrinhoElo(item: any) {
    const itemToAddToCart = {
      userId: localStorage.getItem('userId') || '',
      name: item.elo + ' ' + item.divisao, // Usando o campo elo como nome
      itemId: '', // O campo itemId será preenchido pelo serviço ApiService
      price: item.preco, // Usando o campo preco como price
      quantity: 1
    };
  
    this.apiService.addToCart(itemToAddToCart).subscribe(
      (response: any) => {
        console.log('Item adicionado ao carrinho:', response);
        this.router.navigate(['/cart']);
        window.location.reload();
      },
      (error: any) => {
        console.log('Ocorreu um erro ao adicionar o item ao carrinho:', error);
      }
    );
  }  
  
  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStockElo().subscribe((data: any[]) => {
      this.stockElo = data;
      this.filteredStockElo = [...this.stockElo]; // Initialize filteredStockElo with initial stockElo data
      this.filteredStockDivisao = [...this.stockElo]; // Initialize filteredStockElo with initial stockElo data
    });
  }  
}
