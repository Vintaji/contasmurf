import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface CartItem {
  userId: string;
  name: string;
  itemId: string;
  price: number;
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
  itemId: string = '';
  token: string | null | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.itemId = localStorage.getItem('itemId') || '';
    this.token = this.apiService.getToken(); // Obtém o token do serviço
    this.getCartItems();
  }

  getCartItems(): void {
    this.apiService.getCartItems(this.userId, this.itemId).pipe(
      tap((response: any) => {
        this.cartItems = response;
      }),
      catchError((error: any) => {
        console.log('Ocorreu um erro ao obter os itens do carrinho:', error);
        return of(null);
      })
    ).subscribe();
  }  

  removeItem(item: CartItem): void {
    this.apiService.removeCartItem(item.userId, item.itemId).subscribe(
      () => {
        console.log('Item removido do carrinho');
        // Remova o item localmente da lista de carrinho, se necessário
        const index = this.cartItems.indexOf(item);
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }
      },
      (error) => {
        console.log('Ocorreu um erro ao remover o item do carrinho:', error);
      }
    );
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.apiService.addToCart(item).subscribe(
        (response: any) => {
          console.log('Item do carrinho atualizado:', response);
          // Atualize a exibição do carrinho, se necessário
        },
        (error: any) => {
          console.log('Ocorreu um erro ao atualizar o item do carrinho:', error);
        }
      );
    }
  }
  
  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      item.quantity++;
      this.apiService.addToCart(item).subscribe(
        (response: any) => {
          console.log('Item do carrinho atualizado:', response);
          // Atualize a exibição do carrinho, se necessário
        },
        (error: any) => {
          console.log('Ocorreu um erro ao atualizar o item do carrinho:', error);
        }
      );
    }
  }

  getTotalPrice(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  }

  checkout(): void {
    // Lógica para finalizar a compra
  }
}
