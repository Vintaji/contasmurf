import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

interface CartItem {
  userId: string;
  name: string;
  itemId: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  addToCart(item: CartItem): Observable<any> {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, item];
    this.cartItemsSubject.next(updatedCartItems);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      const extras: NavigationExtras = {
        queryParams: { returnUrl: '/cart' }
      };
      this.router.navigate(['/login'], extras);
    }

    const url = `${this.apiUrl}/cart`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `${this.authService.getToken()}`); // Adicione o cabeçalho de autorização

    return this.http.post(url, item, { headers }).pipe(
      map((response: any) => {
        const newItem = { ...item, itemId: response._id }; // Atribui o _id gerado ao campo itemId
        return { ...response, item: newItem };
      })
    );
  }

  getToken(): string | null {
    return this.authService.getToken();
  }

  getCartItems(userId: string, itemId: string): Observable<CartItem[]> {
    const url = `${this.apiUrl}/cart`;
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('userId', userId)
      .set('itemId', itemId);

    return this.http.get<CartItem[]>(url, { headers, params });
  }

  removeCartItem(item: CartItem): Observable<any> {
    const url = `${this.apiUrl}/cart?itemId=${item.itemId}&userId=${item.userId}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken() ?? '');  
      
    return this.http.delete(url, { headers });
  }
  

  updateCartItem(item: CartItem): Observable<any> {
    const url = `${this.apiUrl}/cart?itemId=${item.itemId}&userId=${item.userId}`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken() ?? '');  
  
    return this.http.put(url, item, { headers });
  }
  
  getStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock`, { headers: this.getHeaders() });
  }

  getStockElo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stockElo`, { headers: this.getHeaders() });
  }

  getStockPBE(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stockPBE`, { headers: this.getHeaders() });
  }

  delStock(stockId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/stock?stockId=${stockId}`, { headers: this.getHeaders() });
  }
  
  delStockElo(stockId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/stockElo?stockId=${stockId}`, { headers: this.getHeaders() });
  }  

  delStockPBE(stockId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/stockPBE?stockId=${stockId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `${token}`);
    }
    return headers;
  }
}
