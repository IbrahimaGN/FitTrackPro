import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdherentService } from '../../core/services/adherent.service';
import { Adherent } from '../../core/models/adherent.model';

@Component({
  selector: 'app-adherents',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './adherents.html',
})
export class AdherentsComponent {

  adherentService = inject(AdherentService);
  private fb = inject(FormBuilder);

  searchQuery = signal('');
  filterStatut = signal<string>('all');

  // Modal édition
  showEditModal = signal(false);
  adherentSelectionne = signal<Adherent | null>(null);

  // Modal suppression
  showDeleteModal = signal(false);
  adherentASupprimer = signal<Adherent | null>(null);

  editForm = this.fb.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    abonnement: ['basic', Validators.required],
    statut: ['actif', Validators.required],
  });

  filteredAdherents = computed(() => {
    let list = this.adherentService.adherents();
    const q = this.searchQuery().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.nom.toLowerCase().includes(q) ||
        a.prenom.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.abonnement.toLowerCase().includes(q)
      );
    }
    if (this.filterStatut() !== 'all') {
      list = list.filter(a => a.statut === this.filterStatut());
    }
    return list;
  });

  // Statut
  changerStatut(id: number, event: Event) {
    const statut = (event.target as HTMLSelectElement).value as 'actif' | 'inactif' | 'en_attente';
    this.adherentService.updateStatut(id, statut);
  }

  // Edition
  ouvrirEdition(a: Adherent) {
    this.adherentSelectionne.set(a);
    this.editForm.patchValue({
      prenom: a.prenom,
      nom: a.nom,
      email: a.email,
      telephone: a.telephone,
      abonnement: a.abonnement,
      statut: a.statut,
    });
    this.showEditModal.set(true);
  }

  fermerEdition() {
    this.showEditModal.set(false);
    this.adherentSelectionne.set(null);
  }

  sauvegarderEdition() {
    if (this.editForm.valid && this.adherentSelectionne()) {
      const f = this.editForm.value;
      const updated: Adherent = {
        ...this.adherentSelectionne()!,
        prenom: f.prenom!,
        nom: f.nom!,
        email: f.email!,
        telephone: f.telephone!,
        abonnement: f.abonnement as 'basic' | 'premium' | 'vip',
        statut: f.statut as 'actif' | 'inactif' | 'en_attente',
      };
      this.adherentService.updateAdherent(updated);
      this.fermerEdition();
    }
  }

  // Suppression
  ouvrirSuppression(a: Adherent) {
    this.adherentASupprimer.set(a);
    this.showDeleteModal.set(true);
  }

  fermerSuppression() {
    this.showDeleteModal.set(false);
    this.adherentASupprimer.set(null);
  }

  confirmerSuppression() {
    if (this.adherentASupprimer()) {
      this.adherentService.deleteAdherent(this.adherentASupprimer()!.id);
      this.fermerSuppression();
    }
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      actif: 'bg-emerald-50 text-emerald-700',
      inactif: 'bg-red-50 text-red-700',
      en_attente: 'bg-amber-50 text-amber-700',
    };
    return map[statut] || '';
  }

  getAbonnementClass(ab: string): string {
    const map: Record<string, string> = {
      basic: 'bg-gray-100 text-gray-600',
      premium: 'bg-violet-50 text-violet-700',
      vip: 'bg-amber-50 text-amber-700',
    };
    return map[ab] || '';
  }
}