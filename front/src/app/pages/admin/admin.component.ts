import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  [x: string]: any;
  stock: any[""];
  currentPage = 1; // Página atual
  itemsPerPage = 10  ; // Quantidade de itens por página

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }
  logout(): void {
    this.authService.removeToken();
    // Realize outras ações necessárias após o logout, como redirecionar para a página de login
  }
  
// No seu componente AdminComponent
// ...

removeStock(index: number) {
  // Lógica para remover o item do estoque usando o índice recebido
  // Por exemplo:
  this.stock.splice(index, 1);
}

editStock(stock: any) {
  // Lógica para editar o item do estoque
  // Você pode passar o objeto 'stock' para um formulário de edição, por exemplo
  console.log('Editar item:', stock);
}

  ngOnInit(): void {
    this.apiService.getStock().subscribe((data) => {
      this.stock = data;
    });
  }
}
