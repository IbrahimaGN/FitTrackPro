import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  cartItems = this.items.asReadonly();

  totalCount = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce((sum, i) => sum + i.product.prix * i.quantity, 0)
  );

  addToCart(product: Product) {
    this.items.update(current => {
      const existing = current.find(i => i.product.id === product.id);
      if (existing) {
        return current.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.items.update(current =>
      current.filter(i => i.product.id !== productId)
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
