import { Injectable, signal } from '@angular/core';
import { Adherent } from '../models/adherent.model';

@Injectable({ providedIn: 'root' })
export class AdherentService {

  private _adherents = signal<Adherent[]>([
    { id: 1, nom: 'Diallo', prenom: 'Moussa', email: 'moussa.diallo@gmail.com', telephone: '+221 77 123 45 67', abonnement: 'premium', statut: 'actif', dateInscription: '2024-01-15', avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 2, nom: 'Sow', prenom: 'Fatou', email: 'fatou.sow@gmail.com', telephone: '+221 76 234 56 78', abonnement: 'basic', statut: 'actif', dateInscription: '2024-02-20', avatar: 'https://i.pravatar.cc/40?img=5' },
    { id: 3, nom: 'Ba', prenom: 'Ibrahima', email: 'ibrahima.ba@gmail.com', telephone: '+221 70 345 67 89', abonnement: 'vip', statut: 'inactif', dateInscription: '2024-03-10', avatar: 'https://i.pravatar.cc/40?img=8' },
    { id: 4, nom: 'Ndiaye', prenom: 'Aïssatou', email: 'aissatou.ndiaye@gmail.com', telephone: '+221 78 456 78 90', abonnement: 'premium', statut: 'actif', dateInscription: '2024-04-05', avatar: 'https://i.pravatar.cc/40?img=9' },
    { id: 5, nom: 'Fall', prenom: 'Omar', email: 'omar.fall@gmail.com', telephone: '+221 77 567 89 01', abonnement: 'basic', statut: 'en_attente', dateInscription: '2024-05-18', avatar: 'https://i.pravatar.cc/40?img=12' },
  ]);

  adherents = this._adherents.asReadonly();

  addAdherent(a: Adherent) {
    this._adherents.update(list => [...list, a]);
  }

  updateStatut(id: number, statut: 'actif' | 'inactif' | 'en_attente') {
    this._adherents.update(list =>
      list.map(a => a.id === id ? { ...a, statut } : a)
    );
  }

  updateAdherent(updated: Adherent) {
    this._adherents.update(list =>
      list.map(a => a.id === updated.id ? { ...updated } : a)
    );
  }

  deleteAdherent(id: number) {
    this._adherents.update(list => list.filter(a => a.id !== id));
  }
}