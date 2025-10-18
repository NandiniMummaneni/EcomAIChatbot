import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { WishlistItem } from '../../models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1 class="gradient-text">My Wishlist</h1>
      
      <div *ngIf="wishlistItems.length === 0" class="empty-wishlist">
        <p>Your wishlist is empty</p>
        <a routerLink="/products" class="btn btn-primary">Browse Products</a>
      </div>
      
      <div class="wishlist-grid" *ngIf="wishlistItems.length > 0">
        <div class="wishlist-item" *ngFor="let item of wishlistItems">
          <img [src]="item.product.image" [alt]="item.product.name" class="product-image">
          <div class="item-info">
            <h3>{{item.product.name}}</h3>
            <p class="price">₹{{item.product.price}}</p>
            <p class="date-added">Added: {{item.dateAdded | date:'short'}}</p>
            <div class="item-actions">
              <button (click)="addToCart(item)" class="btn btn-primary">Add to Cart</button>
              <button (click)="removeFromWishlist(item.product.id)" class="btn btn-secondary">Remove</button>
              <a [routerLink]="['/product', item.product.id]" class="btn btn-outline">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .empty-wishlist {
      text-align: center;
      padding: 4rem 0;
      background: white;
      border-radius: 10px;
      margin: 2rem 0;
    }
    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    .wishlist-item {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .wishlist-item:hover {
      transform: translateY(-5px);
    }
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .item-info {
      padding: 1rem;
    }
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #667eea;
    }
    .date-added {
      color: #666;
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }
    .item-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #667eea;
      color: #667eea;
    }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  addToCart(item: WishlistItem) {
    this.cartService.addToCart(item.product);
  }

  removeFromWishlist(productId: number) {
    this.wishlistService.removeFromWishlist(productId);
  }
}