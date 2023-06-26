import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-estoque-unraked',
  templateUrl: './estoque-unraked.component.html',
  styleUrls: ['./estoque-unraked.component.css']
})
export class EstoqueUnrakedComponent implements OnInit{
  stock: any[] = []; // Array to hold stock data
  currentPage = 1; // Current page for stock pagination
  itemsPerPage = 10; // Number of items per page for stock

  constructor(
    private apiService: ApiService,
  ) { }


  removeStock(index: number, stockId: string) {
    this.apiService.delStock(stockId).subscribe(() => {
      this.stock.splice(index, 1);
      alert('Item removido do estoque');
    }, (error: any) => {
      console.error('Erro ao remover item do estoque:', error);
    });
  }

  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStock().subscribe((data: any[]) => {
      this.stock = data;
    });
  }
}

