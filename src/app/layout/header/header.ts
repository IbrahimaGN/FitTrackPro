import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  cartService = inject(CartService);
  notifService = inject(NotificationService);
  showNotifs = false;
  showCart = false;

  toggleNotifs() {
    this.showNotifs = !this.showNotifs;
    this.showCart = false;
    if (this.showNotifs) this.notifService.markAllAsRead();
  }
  toggleCart() {
    this.showCart = !this.showCart;
    this.showNotifs = false;
  }
}
