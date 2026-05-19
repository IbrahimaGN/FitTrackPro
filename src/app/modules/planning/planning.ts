import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CodeBadgeComponent } from '../../shared/components/code-badge';

interface Cours {
  id: number;
  nom: string;
  instructeur: string;
  heure: string;
  jour: string;
  duree: number;
  capacite: number;
  inscrits: ReturnType<typeof signal<number>>;
  couleur: string;
  emoji: string;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, /*CodeBadgeComponent*/],
  templateUrl: './planning.html',
})
export class PlanningComponent {

  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Module 3 Challenge: Signals pour places restantes
  cours: Cours[] = [
    { id: 1, nom: 'Zumba', instructeur: 'Aminata Diop', heure: '08:00', jour: 'Lundi', duree: 60, capacite: 20, inscrits: signal(18), couleur: 'pink', emoji: '💃' },
    { id: 2, nom: 'Yoga', instructeur: 'Fatou Ba', heure: '10:00', jour: 'Lundi', duree: 75, capacite: 15, inscrits: signal(10), couleur: 'emerald', emoji: '🧘' },
    { id: 3, nom: 'CrossFit', instructeur: 'Moussa Sarr', heure: '18:00', jour: 'Mardi', duree: 45, capacite: 12, inscrits: signal(12), couleur: 'orange', emoji: '🏋️' },
    { id: 4, nom: 'Pilates', instructeur: 'Mariama Fall', heure: '09:00', jour: 'Mercredi', duree: 60, capacite: 10, inscrits: signal(7), couleur: 'blue', emoji: '🤸' },
    { id: 5, nom: 'Boxe', instructeur: 'Ibrahima Ndiaye', heure: '19:00', jour: 'Mercredi', duree: 60, capacite: 16, inscrits: signal(16), couleur: 'red', emoji: '🥊' },
    { id: 6, nom: 'Spinning', instructeur: 'Omar Gueye', heure: '07:00', jour: 'Jeudi', duree: 45, capacite: 20, inscrits: signal(5), couleur: 'violet', emoji: '🚴' },
    { id: 7, nom: 'Natation', instructeur: 'Rokhaya Mbaye', heure: '11:00', jour: 'Vendredi', duree: 60, capacite: 25, inscrits: signal(20), couleur: 'cyan', emoji: '🏊' },
    { id: 8, nom: 'Cardio', instructeur: 'Cheikh Sow', heure: '17:00', jour: 'Samedi', duree: 50, capacite: 30, inscrits: signal(29), couleur: 'amber', emoji: '🏃' },
  ];

  placesRestantes(cours: Cours): number {
    return cours.capacite - cours.inscrits();
  }

  // computed pour déterminer si complet
  estComplet(cours: Cours): boolean {
    return cours.inscrits() >= cours.capacite;
  }

  reserver(cours: Cours) {
    if (!this.estComplet(cours)) {
      cours.inscrits.update(v => v + 1);
    }
  }

  getCoursByJour(jour: string): Cours[] {
    return this.cours.filter(c => c.jour === jour);
  }

  getColorClasses(couleur: string): { card: string; badge: string; btn: string } {
    const map: Record<string, { card: string; badge: string; btn: string }> = {
      pink:    { card: 'border-pink-200 bg-pink-50',    badge: 'bg-pink-100 text-pink-700',    btn: 'bg-pink-500 hover:bg-pink-600' },
      emerald: { card: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-500 hover:bg-emerald-600' },
      orange:  { card: 'border-orange-200 bg-orange-50', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-500 hover:bg-orange-600' },
      blue:    { card: 'border-blue-200 bg-blue-50',    badge: 'bg-blue-100 text-blue-700',    btn: 'bg-blue-500 hover:bg-blue-600' },
      red:     { card: 'border-red-200 bg-red-50',      badge: 'bg-red-100 text-red-700',      btn: 'bg-red-500 hover:bg-red-600' },
      violet:  { card: 'border-violet-200 bg-violet-50', badge: 'bg-violet-100 text-violet-700', btn: 'bg-violet-500 hover:bg-violet-600' },
      cyan:    { card: 'border-cyan-200 bg-cyan-50',    badge: 'bg-cyan-100 text-cyan-700',    btn: 'bg-cyan-500 hover:bg-cyan-600' },
      amber:   { card: 'border-amber-200 bg-amber-50',  badge: 'bg-amber-100 text-amber-700',  btn: 'bg-amber-500 hover:bg-amber-600' },
    };
    return map[couleur] || map['violet'];
  }
}
