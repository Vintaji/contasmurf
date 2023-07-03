import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

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

  constructor(private apiService: ApiService) {}

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

  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStockElo().subscribe((data: any[]) => {
      this.stockElo = data;
      this.filteredStockElo = [...this.stockElo]; // Initialize filteredStockElo with initial stockElo data
      this.filteredStockDivisao = [...this.stockElo]; // Initialize filteredStockElo with initial stockElo data
    });
  }  
}
