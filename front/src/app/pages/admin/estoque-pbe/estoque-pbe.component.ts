import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';

@Component({
  selector: 'app-estoque-pbe',
  templateUrl: './estoque-pbe.component.html',
  styleUrls: ['./estoque-pbe.component.css']
})
export class EstoquePbeComponent implements OnInit{
  stockPBE: any[] = []; // Array to hold stockElo data
  currentPagePBE = 1; // Current page for stockElo pagination
  itemsPerPagePBE = 10; // Number of items per page for stockElo

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  logout(): void {
    this.authService.removeToken();
    // Perform other necessary actions after logout, such as redirecting to the login page
  }
  removeStockPBE(index: number, stockId: string) {
    this.apiService.delStockPBE(stockId).subscribe(() => {
      this.stockPBE.splice(index, 1);
      alert('Item removido do estoque');
    }, (error) => {
      console.error('Erro ao remover item do estoque PBE', error);
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
    this.apiService.getStockPBE().subscribe((data) => {
      this.stockPBE = data;
    });
  }
}
