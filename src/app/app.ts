import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <main class="pt-16 sm:ml-64 min-h-screen bg-gray-50">
      <div class="p-6">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
})
export class AppComponent {}
