import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique.html',
})
export class BoutiqueComponent {
  // Module 8 Challenge: inject() pour accéder au service partagé
  cartService = inject(CartService);

  filterCat = signal<string>('all');

  produits: Product[] = [
    { id: 1, nom: 'Whey Protéine Vanille', description: '2kg - 25g protéines/dose', prix: 35000, categorie: 'complement', stock: 15, image: '🥛', note: 4.8 },
    { id: 2, nom: 'Créatine Monohydrate', description: '500g - Force et récupération', prix: 18000, categorie: 'complement', stock: 20, image: '💊', note: 4.6 },
    { id: 3, nom: 'Gants de Musculation', description: 'Cuir véritable - Taille M/L/XL', prix: 12000, categorie: 'equipement', stock: 8, image: '🥊', note: 4.5 },
    { id: 4, nom: 'Corde à Sauter Pro', description: 'Acier inoxydable - Réglable', prix: 8500, categorie: 'equipement', stock: 12, image: '🪢', note: 4.3 },
    { id: 5, nom: 'Tee-shirt Compression', description: 'Polyester - Évacue la transpiration', prix: 15000, categorie: 'vetement', stock: 25, image: '👕', note: 4.4 },
    { id: 6, nom: 'Legging Sport Femme', description: 'Squat-proof - Taille haute', prix: 22000, categorie: 'vetement', stock: 18, image: '👖', note: 4.7 },
    { id: 7, nom: 'BCAA Framboise', description: '300g - Acides aminés essentiels', prix: 14000, categorie: 'complement', stock: 30, image: '🍇', note: 4.2 },
    { id: 8, nom: 'Tapis de Yoga Premium', description: '6mm - Antidérapant - 183x61cm', prix: 28000, categorie: 'equipement', stock: 7, image: '🧘', note: 4.9 },
  ];

  filteredProduits() {
    if (this.filterCat() === 'all') return this.produits;
    return this.produits.filter(p => p.categorie === this.filterCat());
  }

  inCart(id: number): boolean {
    return this.cartService.cartItems().some(i => i.product.id === id);
  }

  categories = [
    { val: 'all', label: 'Tout', emoji: '🏪' },
    { val: 'complement', label: 'Compléments', emoji: '💊' },
    { val: 'equipement', label: 'Équipement', emoji: '🏋️' },
    { val: 'vetement', label: 'Vêtements', emoji: '👕' },
  ];
}
