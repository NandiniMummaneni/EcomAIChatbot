import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="gradient-text">Shopping Cart</h1>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <a href="/products" class="btn btn-primary">Continue Shopping</a>
      </div>
      
      <div *ngIf="cartItems.length > 0" class="cart-content">
        <div class="cart-items">
          <div class="cart-item" *ngFor="let item of cartItems">
            <img [src]="item.product.image" [alt]="item.product.name" class="item-image">
            <div class="item-details">
              <h3>{{item.product.name}}</h3>
              <p class="price">₹{{item.product.price}}</p>
            </div>
            <div class="quantity-controls">
              <button (click)="updateQuantity(item.product.id, item.quantity - 1)" 
                      [disabled]="item.quantity <= 1" class="btn btn-secondary">-</button>
              <span class="quantity">{{item.quantity}}</span>
              <button (click)="updateQuantity(item.product.id, item.quantity + 1)" 
                      class="btn btn-secondary">+</button>
            </div>
            <div class="item-total">
₹{{(item.product.price * item.quantity)}}
            </div>
            <button (click)="removeItem(item.product.id)" class="btn btn-danger">Remove</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Total Items:</span>
              <span>{{getTotalItems()}}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>₹{{getTotal()}}</span>
            </div>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .empty-cart {
      text-align: center;
      padding: 4rem 0;
      background: white;
      border-radius: 10px;
      margin: 2rem 0;
    }
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin: 2rem 0;
    }
    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto auto auto;
      gap: 1rem;
      align-items: center;
      background: white;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }
    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 5px;
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .quantity {
      padding: 0.5rem;
      min-width: 40px;
      text-align: center;
    }
    .summary-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      position: sticky;
      top: 2rem;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
    .summary-row.total {
      font-weight: bold;
      font-size: 1.2rem;
      border-top: 1px solid #eee;
      padding-top: 1rem;
    }
    .checkout-btn {
      width: 100%;
      margin-top: 1rem;
    }
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
      .cart-item {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getTotalItems(): number {
    return this.cartService.getItemCount();
  }
}