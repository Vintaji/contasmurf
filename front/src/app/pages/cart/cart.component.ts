import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface CartItem {
  userId: string;
  name: string;
  itemId: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: string = '';
  token: string = '';
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUserData();
    this.getCartItems();
  }
  
  getUserData() {
    this.userId = localStorage.getItem('userId') ?? '';
    this.token = localStorage.getItem('token') ?? '';
  }
  

  getCartItems() {
    const headers = new HttpHeaders().set('Authorization', this.token);

    this.http.get<CartItem[]>(`http://localhost:3000/api/cart?userId=${this.userId}`, { headers }).subscribe(
      (response) => {
        this.cartItems = response;
      },
      (error) => {
        console.log('Ocorreu um erro ao obter os itens do carrinho:', error);
      }
    );
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(item: CartItem) {
    const headers = new HttpHeaders().set('Authorization', this.token);

    this.http.delete(`http://localhost:3000/api/cart/${this.userId}/${item.itemId}`, { headers }).subscribe(
      () => {
        // Removendo o item localmente
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.itemId !== item.itemId);
      },
      (error) => {
        console.log('Ocorreu um erro ao remover o item do carrinho:', error);
      }
    );
  }

  checkout() {
    // Realizar o checkout (finalizar a compra)
    // Implemente a lógica de finalização da compra de acordo com as necessidades do seu aplicativo
    // Você pode fazer uma requisição HTTP para um endpoint de checkout ou realizar outras ações aqui
    // Após a finalização da compra, você pode redirecionar o usuário para uma página de confirmação
    this.router.navigate(['/checkout']);
  }
}
