import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/internal/Observable';

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
  totalPrice: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.itemId = localStorage.getItem('itemId') || '';
    this.getCartItems(this.userId, this.itemId);
  }

  getCartItems(userId: string, itemId: string): void {
    this.apiService.getCartItems(userId, itemId).subscribe(
      (response: CartItem[] | CartItem) => {
        if (Array.isArray(response)) {
          this.cartItems = response;
        } else {
          this.cartItems = [response];
        }
        this.updateTotalPrice(); // Atualiza o preço total após obter os itens do carrinho
      },
      (error: any) => {
        console.log('Ocorreu um erro ao obter os itens do carrinho:', error);
      }
    );
  }

  removeItem(item: CartItem): void {
    this.apiService.removeCartItem(item).subscribe(
      () => {
        console.log('Item removido do carrinho');
        // Remova o item localmente da lista de carrinho, se necessário
        const index = this.cartItems.indexOf(item);
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }
        this.updateTotalPrice(); // Atualiza o preço total após remover o item do carrinho
      },
      (error) => {
        console.log('Ocorreu um erro ao remover o item do carrinho:', error);
      }
    );
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const previousQuantity = item.quantity;
      item.quantity--;
      item.price = item.price / previousQuantity * item.quantity; // Atualiza o preço proporcionalmente
      this.updateCartItem(item).subscribe(
        (response: any) => {
          console.log('Item do carrinho atualizado:', response);
          this.updateTotalPrice(); // Atualiza o preço total após atualizar o item do carrinho
        },
        (error: any) => {
          console.log('Ocorreu um erro ao atualizar o item do carrinho:', error);
        }
      );
    }
  }
  
  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      const previousQuantity = item.quantity;
      item.quantity++;
      item.price = item.price / previousQuantity * item.quantity; // Atualiza o preço proporcionalmente
      this.updateCartItem(item).subscribe(
        (response: any) => {
          console.log('Item do carrinho atualizado:', response);
          this.updateTotalPrice(); // Atualiza o preço total após atualizar o item do carrinho
  
          if (item.quantity === 10) {
            alert('A quantidade maxima por item é 10.');
          }
        },
        (error: any) => {
          console.log('Ocorreu um erro ao atualizar o item do carrinho:', error);
        }
      );
    }
  }
  
  private updateCartItem(item: CartItem): Observable<any> {
    return this.apiService.updateCartItem(item);
  }
  
  private updateTotalPrice(): void {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price;
    }
    this.totalPrice = total.toFixed(2);
  }  
  
  addItemToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.itemId === item.itemId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.price += item.price * item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.updateTotalPrice(); // Atualiza o preço total após adicionar o item ao carrinho
  }

  checkout(): void {
    // Lógica para finalizar a compra
  }
}
