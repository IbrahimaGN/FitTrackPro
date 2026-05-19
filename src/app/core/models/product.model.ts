export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  categorie: 'complement' | 'equipement' | 'vetement';
  stock: number;
  image: string;
  note: number;
}
