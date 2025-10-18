import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" *ngIf="product">
      <div class="product-detail">
        <div class="product-image-section">
          <img [src]="product.image" [alt]="product.name" class="product-image">
        </div>
        
        <div class="product-info-section">
          <h1>{{product.name}}</h1>
          <div class="rating">★ {{product.rating}}/5</div>
          <div class="price">₹{{product.price}}</div>
          <div class="stock-status" [class.in-stock]="product.inStock" [class.out-of-stock]="!product.inStock">
            {{product.inStock ? 'In Stock' : 'Out of Stock'}}
          </div>
          
          <div class="description">
            <h3>Description</h3>
            <p>{{product.description}}</p>
          </div>
          
          <div class="product-actions">
            <div class="quantity-selector">
              <label>Quantity:</label>
              <select [(ngModel)]="selectedQuantity" class="quantity-select">
                <option *ngFor="let qty of quantities" [value]="qty">{{qty}}</option>
              </select>
            </div>
            
            <div class="action-buttons">
              <button (click)="addToCart()" [disabled]="!product.inStock" 
                      class="btn btn-primary add-to-cart-btn">
                Add to Cart
              </button>
              <button (click)="toggleWishlist()" 
                      [class]="isInWishlist ? 'btn btn-secondary' : 'btn btn-outline'">
                {{isInWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin: 2rem 0;
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .product-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 10px;
    }
    .product-info-section h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }
    .rating {
      color: #ffa500;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 1rem;
    }
    .stock-status {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-weight: bold;
      margin-bottom: 2rem;
      display: inline-block;
    }
    .in-stock {
      background: #d4edda;
      color: #155724;
    }
    .out-of-stock {
      background: #f8d7da;
      color: #721c24;
    }
    .description {
      margin: 2rem 0;
    }
    .description h3 {
      margin-bottom: 1rem;
    }
    .quantity-selector {
      margin-bottom: 1rem;
    }
    .quantity-select {
      margin-left: 0.5rem;
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
    .action-buttons {
      display: flex;
      gap: 1rem;
    }
    .add-to-cart-btn {
      flex: 1;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #667eea;
      color: #667eea;
    }
    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedQuantity = 1;
  quantities = [1, 2, 3, 4, 5];
  isInWishlist = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
      this.isInWishlist = this.wishlistService.isInWishlist(product.id);
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
    }
  }

  toggleWishlist() {
    if (this.product) {
      if (this.isInWishlist) {
        this.wishlistService.removeFromWishlist(this.product.id);
      } else {
        this.wishlistService.addToWishlist(this.product);
      }
      this.isInWishlist = !this.isInWishlist;
    }
  }
}