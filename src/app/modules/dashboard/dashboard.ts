import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {

  gymName = signal('FitTrack Pro');

  stats = [
    { label: 'Adhérents', value: '1 245', change: '+12%', changeType: 'up', icon: '👥', color: 'violet' },
    { label: 'Cotisations', value: '850 000', unit: 'FCFA', change: '+8%', changeType: 'up', icon: '💰', color: 'emerald' },
    { label: 'Événements', value: '24', change: '6 à venir', changeType: 'neutral', icon: '📅', color: 'blue' },
    { label: 'Demandes', value: '38', change: '5 en attente', changeType: 'warning', icon: '📋', color: 'orange' },
  ];

  anneeSelectionnee = signal(2025);

  annees = [2023, 2024, 2025];

  donneesParAnnee: Record<number, { month: string; value: number }[]> = {
    2023: [
      { month: 'Jan', value: 3 },
      { month: 'Fév', value: 4 },
      { month: 'Mar', value: 3 },
      { month: 'Avr', value: 5 },
      { month: 'Mai', value: 4 },
      { month: 'Juin', value: 6 },
      { month: 'Juil', value: 5 },
      { month: 'Août', value: 4 },
      { month: 'Sep', value: 6 },
      { month: 'Oct', value: 7 },
      { month: 'Nov', value: 6 },
      { month: 'Déc', value: 8 },
    ],
    2024: [
      { month: 'Jan', value: 5 },
      { month: 'Fév', value: 6 },
      { month: 'Mar', value: 7 },
      { month: 'Avr', value: 5 },
      { month: 'Mai', value: 9 },
      { month: 'Juin', value: 10 },
      { month: 'Juil', value: 8 },
      { month: 'Août', value: 7 },
      { month: 'Sep', value: 9 },
      { month: 'Oct', value: 11 },
      { month: 'Nov', value: 9 },
      { month: 'Déc', value: 12 },
    ],
    2025: [
      { month: 'Jan', value: 6 },
      { month: 'Fév', value: 8 },
      { month: 'Mar', value: 9 },
      { month: 'Avr', value: 7 },
      { month: 'Mai', value: 10 },
      { month: 'Juin', value: 30 },
      { month: 'Juil', value: 15 },
      { month: 'Août', value: 0 },
      { month: 'Sep', value: 12 },
      { month: 'Oct', value: 14 },
      { month: 'Nov', value: 11 },
      { month: 'Déc', value: 15 },
    ],
  };

  chartData = computed(() =>
    this.donneesParAnnee[this.anneeSelectionnee()] ?? []
  );

  maxChartValue = computed(() =>
    Math.max(...this.chartData().map(d => d.value))
  );

  recentMembers = [
    { name: 'Moussa Diallo', type: 'Premium', avatar: 'https://i.pravatar.cc/40?img=3', time: 'Il y a 2h' },
    { name: 'Fatou Sow', type: 'Basic', avatar: 'https://i.pravatar.cc/40?img=5', time: 'Il y a 5h' },
    { name: 'Ibrahima Ba', type: 'VIP', avatar: 'https://i.pravatar.cc/40?img=8', time: 'Hier' },
    { name: 'Aïssatou Ndiaye', type: 'Premium', avatar: 'https://i.pravatar.cc/40?img=9', time: 'Hier' },
  ];

  getBarHeight(value: number): string {
    const maxHeight = 160; // hauteur max en px (h-44 = 176px, on garde une marge)
    return `${(value / this.maxChartValue()) * maxHeight}px`;
  }
}