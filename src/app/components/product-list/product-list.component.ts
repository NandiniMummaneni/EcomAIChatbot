import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1 class="gradient-text">Products</h1>
      <div class="filters">
        <select (change)="filterByCategory($event)" class="filter-select">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
          <option value="books">Books</option>
        </select>
      </div>
      
      <div class="product-grid">
        <div class="product-card" *ngFor="let product of filteredProducts">
          <img [src]="product.image" [alt]="product.name" class="product-image">
          <div class="product-info">
            <h3>{{product.name}}</h3>
            <p class="price">₹{{product.price}}</p>
            <p class="rating">★ {{product.rating}}/5</p>
            <div class="product-actions">
              <button (click)="addToCart(product)" class="btn btn-primary">Add to Cart</button>
              <button (click)="toggleWishlist(product)" 
                      [class]="isInWishlist(product.id) ? 'btn btn-secondary' : 'btn btn-outline'">
                {{isInWishlist(product.id) ? '♥' : '♡'}}
              </button>
              <a [routerLink]="['/product', product.id]" class="btn btn-outline">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters {
      margin: 2rem 0;
    }
    .filter-select {
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .product-card:hover {
      transform: translateY(-5px);
    }
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .product-info {
      padding: 1rem;
    }
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #667eea;
    }
    .rating {
      color: #ffa500;
    }
    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #667eea;
      color: #667eea;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.filterByCategory({ target: { value: params['category'] } } as any);
      }
    });
  }

  filterByCategory(event: any) {
    const category = event.target.value;
    this.filteredProducts = category ? 
      this.products.filter(p => p.category === category) : 
      this.products;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: Product) {
    if (this.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id);
    } else {
      this.wishlistService.addToWishlist(product);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}