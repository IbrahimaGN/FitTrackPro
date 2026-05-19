import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CodeBadgeComponent } from '../../shared/components/code-badge';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Post {
  id: number;
  auteur: string;
  avatar: string;
  message: string;
  likes: ReturnType<typeof signal<number>>;
  time: string;
  badge: string;
}

@Component({
  selector: 'app-communaute',
  standalone: true,
  imports: [CommonModule, FormsModule, /*CodeBadgeComponent*/],
  templateUrl: './communaute.html',
})
export class CommunauteComponent implements OnInit {
  notifService = inject(NotificationService);
  newMessage = signal('');

  // Module 9 Challenge: toSignal() pour transformer un flux RxJS en signal
  tickerMessages = [
    '🏋️ Moussa a battu son record au développé couché !',
    '🧘 Cours de yoga complet ce soir — inscrivez-vous vite',
    '🥇 Fatou a atteint son objectif de poids !',
    '🎉 FitTrack Pro fête ses 1000 adhérents !',
    '💪 Défi mensuel : 30 jours de burpees — participez !',
  ];

  // toSignal() transforme un Observable RxJS en Signal
  currentTicker = toSignal(
    interval(4000).pipe(
      startWith(0),
      map(i => this.tickerMessages[i % this.tickerMessages.length])
    ),
    { initialValue: this.tickerMessages[0] }
  );

  posts = signal<Post[]>([
    { id: 1, auteur: 'Moussa Diallo', avatar: 'https://i.pravatar.cc/40?img=3', message: 'Séance de CrossFit incroyable ce matin 🔥 J\'ai battu mon record sur les tractions !', likes: signal(24), time: 'Il y a 5 min', badge: '🏆 Top Performer' },
    { id: 2, auteur: 'Fatou Sow', avatar: 'https://i.pravatar.cc/40?img=5', message: 'Le cours de yoga du lundi soir est vraiment relaxant. Merci Aminata pour cette séance magique 🧘‍♀️', likes: signal(18), time: 'Il y a 12 min', badge: '🌟 Membre' },
    { id: 3, auteur: 'Ibrahima Ba', avatar: 'https://i.pravatar.cc/40?img=8', message: '-8 kg en 3 mois grâce au programme nutrition ! L\'application FitTrack est vraiment top 💪', likes: signal(45), time: 'Il y a 1h', badge: '💎 VIP' },
    { id: 4, auteur: 'Aïssatou Ndiaye', avatar: 'https://i.pravatar.cc/40?img=9', message: 'Je recommande vivement la boxe thaïe pour le stress. Deux mois que j\'y vais et je me sens transformée !', likes: signal(31), time: 'Il y a 2h', badge: '⭐ Premium' },
  ]);

  addLike(post: Post) {
    post.likes.update(v => v + 1);
  }

  sendMessage() {
    if (!this.newMessage().trim()) return;
    const p: Post = {
      id: Date.now(),
      auteur: 'Cheikhouna (vous)',
      avatar: 'https://i.pravatar.cc/40?img=12',
      message: this.newMessage(),
      likes: signal(0),
      time: 'À l\'instant',
      badge: '🛡️ Admin',
    };
    this.posts.update(posts => [p, ...posts]);
    this.notifService.addNotification(`Nouveau post dans la communauté`, 'info');
    this.newMessage.set('');
  }

  ngOnInit() {}
}
