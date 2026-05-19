import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'adherents',
    loadComponent: () => import('./modules/adherents/adherents').then(m => m.AdherentsComponent)
  },
  {
    path: 'planning',
    loadComponent: () => import('./modules/planning/planning').then(m => m.PlanningComponent)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./modules/inscription/inscription').then(m => m.InscriptionComponent)
  },
  {
    path: 'premium',
    loadComponent: () => import('./modules/premium/premium').then(m => m.PremiumComponent)
  },
  {
    path: 'nutrition',
    loadComponent: () => import('./modules/nutrition/nutrition').then(m => m.NutritionComponent)
  },
  {
    path: 'health',
    loadComponent: () => import('./modules/health/health').then(m => m.HealthComponent)
  },
  {
    path: 'boutique',
    loadComponent: () => import('./modules/boutique/boutique').then(m => m.BoutiqueComponent)
  },
  {
    path: 'communaute',
    loadComponent: () => import('./modules/communaute/communaute').then(m => m.CommunauteComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
