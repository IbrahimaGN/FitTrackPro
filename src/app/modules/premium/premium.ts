import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CodeBadgeComponent } from '../../shared/components/code-badge';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule, /*CodeBadgeComponent*/],
  templateUrl: './premium.html',
})
export class PremiumComponent {
  stats = [
    { label: 'Lundi', valeur: 85, heure: '18h-20h' },
    { label: 'Mardi', valeur: 60, heure: '12h-14h' },
    { label: 'Mercredi', valeur: 95, heure: '18h-20h' },
    { label: 'Jeudi', valeur: 45, heure: '08h-10h' },
    { label: 'Vendredi', valeur: 100, heure: '18h-21h' },
    { label: 'Samedi', valeur: 75, heure: '10h-12h' },
  ];

  coursPopulaires = [
    { nom: 'CrossFit Intense', adherents: 234, progression: 92, emoji: '🏋️', color: 'orange' },
    { nom: 'Yoga Relaxation', adherents: 198, progression: 78, emoji: '🧘', color: 'emerald' },
    { nom: 'Zumba Party', adherents: 187, progression: 74, emoji: '💃', color: 'pink' },
    { nom: 'Boxe Thaïe', adherents: 156, progression: 62, emoji: '🥊', color: 'red' },
  ];
}
