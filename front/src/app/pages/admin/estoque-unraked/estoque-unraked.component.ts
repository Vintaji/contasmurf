import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';

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
    public dialog: MatDialog
  ) { }


  removeStock(index: number, stockId: string) {
    this.apiService.delStock(stockId).subscribe(() => {
      this.stock.splice(index, 1);
      alert('Item removido do estoque');
    }, (error: any) => {
      console.error('Erro ao remover item do estoque:', error);
    });
  }

  openPopupElo(): void {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      width: '400px', // Defina a largura desejada para o popup/modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ser executada após o fechamento do popup/modal
    });
  }  
  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStock().subscribe((data: any[]) => {
      this.stock = data;
    });
  }
}

