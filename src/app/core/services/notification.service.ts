import { Injectable, signal } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = signal<Notification[]>([
    { id: 1, message: 'Nouvel adhérent inscrit : Moussa Diallo', type: 'success', time: 'Il y a 2 min', read: false },
    { id: 2, message: 'Cours de Yoga complet ce soir', type: 'warning', time: 'Il y a 5 min', read: false },
    { id: 3, message: 'Paiement reçu : 25 000 FCFA', type: 'success', time: 'Il y a 10 min', read: true },
  ]);

  notifications = this._notifications.asReadonly();

  unreadCount = signal(2);

  markAllAsRead() {
    this._notifications.update(ns => ns.map(n => ({ ...n, read: true })));
    this.unreadCount.set(0);
  }

  addNotification(msg: string, type: 'info' | 'success' | 'warning' = 'info') {
    const n: Notification = {
      id: Date.now(),
      message: msg,
      type,
      time: 'À l\'instant',
      read: false
    };
    this._notifications.update(ns => [n, ...ns]);
    this.unreadCount.update(c => c + 1);
  }
}
