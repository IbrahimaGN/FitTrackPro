import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  isCollapsed = signal(false);

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Adhérents', icon: '👥', route: '/adherents' },
    { label: 'Planning', icon: '📅', route: '/planning' },
    { label: 'Inscriptions', icon: '📝', route: '/inscription', badge: 'NEW' },
    { label: 'Espace Premium', icon: '⭐', route: '/premium' },
    { label: 'Nutrition', icon: '🥗', route: '/nutrition' },
    { label: 'Santé & Suivi', icon: '❤️', route: '/health' },
    { label: 'Boutique', icon: '🛒', route: '/boutique' },
    { label: 'Communauté', icon: '💬', route: '/communaute' },
  ];

  toggle() {
    this.isCollapsed.update(v => !v);
  }
}
