import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HealthChartComponent, WeightEntry } from './health-chart';
// import { CodeBadgeComponent } from '../../shared/components/code-badge';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule, FormsModule, HealthChartComponent, /*CodeBadgeComponent*/],
  templateUrl: './health.html',
})
export class HealthComponent {
  // Module 7: Parent qui passe des données au composant enfant via input()
  weightHistory = signal<WeightEntry[]>([
    { date: '2025-01-01', poids: 80, taille: 175 },
    { date: '2025-02-01', poids: 78, taille: 175 },
    { date: '2025-03-01', poids: 76, taille: 175 },
    { date: '2025-04-01', poids: 75, taille: 175 },
    { date: '2025-05-01', poids: 73, taille: 175 },
    { date: '2025-06-01', poids: 72, taille: 175 },
  ]);

  newPoids = signal(72);
  newTaille = signal(175);

  latestEntry = computed(() => {
    const h = this.weightHistory();
    return h[h.length - 1];
  });

  latestIMC = computed(() => {
    const e = this.latestEntry();
    return +(e.poids / ((e.taille / 100) ** 2)).toFixed(1);
  });

  variation = computed(() => {
    const h = this.weightHistory();
    if (h.length < 2) return 0;
    return +(h[h.length - 1].poids - h[0].poids).toFixed(1);
  });

  ajouterMesure() {
    const today = new Date().toISOString().slice(0, 10);
    const entry: WeightEntry = {
      date: today,
      poids: this.newPoids(),
      taille: this.newTaille(),
    };
    this.weightHistory.update(h => [...h, entry]);
  }
}
