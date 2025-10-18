import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WishlistItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: WishlistItem[] = [];
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  
  wishlist$ = this.wishlistSubject.asObservable();

  addToWishlist(product: Product): void {
    const exists = this.wishlistItems.find(item => item.product.id === product.id);
    if (!exists) {
      this.wishlistItems.push({ product, dateAdded: new Date() });
      this.wishlistSubject.next([...this.wishlistItems]);
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.product.id !== productId);
    this.wishlistSubject.next([...this.wishlistItems]);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.product.id === productId);
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }
}