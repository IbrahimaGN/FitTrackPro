import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeightEntry {
  date: string;
  poids: number;
  taille: number;
}

@Component({
  selector: 'app-health-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-900 mb-1">📈 Évolution du poids </h3>

      <!-- <p class="text-xs text-gray-400 mb-5">
        <span class="bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-mono">input() Signal</span>
        Données passées du composant parent
      </p> -->

      <!-- Mini chart -->
      <div class="flex items-end gap-3 h-30 mb-3">
        @for (e of entries(); track e.date) {
          <div class="flex-1 flex flex-col items-center gap-1">
            <span class="text-[10px] font-bold text-gray-600">{{ e.poids }}</span>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400"
              [style.height]="getBarHeight(e.poids) + 'px'">
            </div>
            <span class="text-[10px] text-gray-400">{{ e.date.slice(5) }}</span>
          </div>
        }
      </div>

      <!-- IMC List -->
      <div class="space-y-2 mt-4">
        @for (e of entries(); track e.date) {
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
            <span class="text-xs text-gray-500">{{ e.date }}</span>
            <span class="text-xs font-semibold text-gray-700">{{ e.poids }} kg</span>
            <span class="text-xs font-bold text-violet-600">IMC {{ getIMC(e) }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class HealthChartComponent {
  // Module 7 Challenge: input() de type Signal
  entries = input<WeightEntry[]>([]);

  getIMC(e: WeightEntry): string {
    return (e.poids / ((e.taille / 100) ** 2)).toFixed(1);
  }

  getBarHeight(poids: number): number {
    const all = this.entries().map(e => e.poids);
    const min = Math.min(...all);
    const max = Math.max(...all);
    return 20 + ((poids - min) / (max - min || 1)) * 90;
  }
}
