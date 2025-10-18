import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <h1>EcomAI</h1>
        </div>
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/products" routerLinkActive="active">Products</a>
          <a routerLink="/cart" routerLinkActive="active" class="cart-link">
            Cart ({{cartCount}})
          </a>
          <a routerLink="/wishlist" routerLinkActive="active" class="wishlist-link">
            Wishlist ({{wishlistCount}})
          </a>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand h1 {
      font-size: 2rem;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      font-weight: bold;
    }
    .nav-menu {
      display: flex;
      gap: 2rem;
    }
    .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.3s;
    }
    .nav-menu a:hover, .nav-menu a.active {
      background: rgba(255,255,255,0.2);
    }
    @media (max-width: 768px) {
      .nav-menu {
        gap: 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent {
  cartCount = 0;
  wishlistCount = 0;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getItemCount();
    });
    
    this.wishlistService.wishlist$.subscribe(() => {
      this.wishlistCount = this.wishlistService.getWishlistCount();
    });
  }
}