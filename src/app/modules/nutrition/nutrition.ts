import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CodeBadgeComponent } from '../../shared/components/code-badge';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, FormsModule, /*CodeBadgeComponent*/],
  templateUrl: './nutrition.html',
})
export class NutritionComponent {
  // Module 6 Challenge: effect() pour logger les changements
  poids = signal(70);
  taille = signal(175);
  age = signal(25);
  sexe = signal<'homme' | 'femme'>('homme');
  activite = signal(1.55);
  log = signal<string[]>([]);

  // Calcul BMR (Mifflin-St Jeor)
  bmr = computed(() => {
    if (this.sexe() === 'homme') {
      return 10 * this.poids() + 6.25 * this.taille() - 5 * this.age() + 5;
    }
    return 10 * this.poids() + 6.25 * this.taille() - 5 * this.age() - 161;
  });

  // TDEE
  calories = computed(() => Math.round(this.bmr() * this.activite()));

  proteines = computed(() => Math.round(this.poids() * 2));
  glucides = computed(() => Math.round((this.calories() * 0.45) / 4));
  lipides = computed(() => Math.round((this.calories() * 0.25) / 9));

  imc = computed(() => +(this.poids() / ((this.taille() / 100) ** 2)).toFixed(1));

  imcLabel = computed(() => {
    const v = this.imc();
    if (v < 18.5) return { label: 'Insuffisance pondérale', color: 'blue' };
    if (v < 25) return { label: 'Poids normal ✓', color: 'emerald' };
    if (v < 30) return { label: 'Surpoids', color: 'amber' };
    return { label: 'Obésité', color: 'red' };
  });

  niveauxActivite = [
    { label: 'Sédentaire (peu ou pas d\'exercice)', value: 1.2 },
    { label: 'Légèrement actif (1-3 jours/sem)', value: 1.375 },
    { label: 'Modérément actif (3-5 jours/sem)', value: 1.55 },
    { label: 'Très actif (6-7 jours/sem)', value: 1.725 },
    { label: 'Extrêmement actif (sport + travail physique)', value: 1.9 },
  ];

  constructor() {
    // Module 6 Challenge: effect() — log automatique des changements
    effect(() => {
      const entry = `[${new Date().toLocaleTimeString()}] Calories: ${this.calories()} kcal | IMC: ${this.imc()} | P:${this.proteines()}g G:${this.glucides()}g L:${this.lipides()}g`;
      this.log.update(l => [entry, ...l].slice(0, 6));
    });
  }
}
