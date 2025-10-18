import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <div class="container">
        <section class="hero">
          <h1 class="gradient-text">Welcome to EcomAI</h1>
          <p>Your Smart Shopping Experience with AI Assistant REX</p>
          <a routerLink="/products" class="btn btn-primary">Shop Now</a>
        </section>
        
        <section class="categories">
          <h2>Shop by Category</h2>
          <div class="category-grid">
            <div class="category-card" *ngFor="let category of categories">
              <h3>{{category.name}}</h3>
              <p>{{category.description}}</p>
              <a [routerLink]="['/products']" [queryParams]="{category: category.id}" class="btn btn-secondary">Browse</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 0;
      background: white;
      border-radius: 15px;
      margin: 2rem 0;
    }
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }
    .categories {
      margin: 3rem 0;
    }
    .categories h2 {
      text-align: center;
      color: white;
      margin-bottom: 2rem;
    }
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .category-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .category-card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class HomeComponent {
  categories = [
    { id: 'electronics', name: 'Electronics', description: 'Latest gadgets and tech' },
    { id: 'clothing', name: 'Clothing', description: 'Fashion for everyone' },
    { id: 'home', name: 'Home & Garden', description: 'Everything for your home' },
    { id: 'books', name: 'Books', description: 'Knowledge and entertainment' }
  ];
}