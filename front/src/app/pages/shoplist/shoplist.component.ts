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
  itemsPerPageElo = 5; // Number of items per page for stockElo

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    // Fetch stock data from ApiService
    this.apiService.getStockElo().subscribe((data: any[]) => {
      this.stockElo = data;
    });
  }
}
