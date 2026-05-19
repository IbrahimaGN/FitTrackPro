export interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  abonnement: 'basic' | 'premium' | 'vip';
  statut: 'actif' | 'inactif' | 'en_attente';
  dateInscription: string;
  avatar?: string;
}
