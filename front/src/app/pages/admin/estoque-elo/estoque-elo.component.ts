import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';

@Component({
  selector: 'app-estoque-elo',
  templateUrl: './estoque-elo.component.html',
  styleUrls: ['./estoque-elo.component.css']
})
export class EstoqueEloComponent implements OnInit{
  stockElo: any[] = []; // Array to hold stockElo data
  currentPageElo = 1; // Current page for stockElo pagination
  itemsPerPageElo = 10; // Number of items per page for stockElo

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  logout(): void {
    this.authService.removeToken();
    // Perform other necessary actions after logout, such as redirecting to the login page
  }
  removeStockElo(index: number, stockEloId: string) {
    this.apiService.delStockElo(stockEloId).subscribe(() => {
      this.stockElo.splice(index, 1);
      alert('Item removido do estoque');
    }, (error) => {
      console.error('Erro ao remover item do estoque Elo:', error);
    });
  }
  
  openPopup(): void {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      width: '400px', // Defina a largura desejada para o popup/modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ser executada após o fechamento do popup/modal
    });
  }  
  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStockElo().subscribe((data) => {
      this.stockElo = data;
    });
  }
}
