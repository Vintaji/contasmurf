import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  quantity: number = 0;

  @Output() popupClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  onClosePopup() {
    this.popupClosed.emit();
  }

  onPay() {
    // Fazer chamada à API para checar estoque
    this.http.get<any>('http://localhost:3000/api/stock').subscribe(
      (response) => {
        const estoqueDisponivel = response.length; // Contar a quantidade de _id na resposta
  
        if (this.quantity <= estoqueDisponivel) {
          // Processar o pagamento
          this.processarPagamento();
        } else {
          // Exibir mensagem de erro de estoque insuficiente
          alert('Estoque insuficiente. Por favor, selecione uma quantidade menor.');
        }
      },
      (error) => {
        // Tratar erro de chamada à API
        console.error('Erro ao checar estoque:', error);
        alert('Erro ao checar estoque. Por favor, tente novamente mais tarde.');
      }
    );
  }
  

  private processarPagamento() {
    // Lógica para processar o pagamento
    // Aqui você pode implementar a lógica de pagamento conforme sua necessidade

    // Exemplo: exibindo um alerta com a quantidade selecionada
    alert(`Pagamento processado para quantidade: ${this.quantity}`);

    // Fechando o popup após o pagamento
    this.onClosePopup();
  }
}
