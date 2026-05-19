import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdherentService } from '../../core/services/adherent.service';
import { Adherent } from '../../core/models/adherent.model';
import { Router } from '@angular/router';

function ageValidator(control: AbstractControl) {
  if (!control.value) return null;
  const today = new Date();
  const birth = new Date(control.value);
  const age = today.getFullYear() - birth.getFullYear();
  return age < 16 ? { ageTooYoung: true } : null;
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.html',
})
export class InscriptionComponent {
  private adherentService = inject(AdherentService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  submitted = false;
  success = false;

  form = this.fb.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s]{8,15}$/)]],
    dateNaissance: ['', [Validators.required, ageValidator]],
    abonnement: ['basic', Validators.required],
    objectif: [''],
    acceptTerms: [false, Validators.requiredTrue],
  });

  get f() { return this.form.controls; }

  showError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  getError(field: string): string {
    const ctrl = this.form.get(field);
    if (!ctrl || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Ce champ est obligatoire';
    if (ctrl.errors['email']) return 'Email invalide';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} caractères`;
    if (ctrl.errors['pattern']) return 'Format invalide';
    if (ctrl.errors['ageTooYoung']) return 'Vous devez avoir au moins 16 ans';
    if (ctrl.errors['requiredTrue']) return 'Vous devez accepter les conditions';
    return 'Valeur incorrecte';
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const f = this.form.value;
      const nouvelAdherent: Adherent = {
        id: this.adherentService.adherents().length + 1,
        nom: f.nom!,
        prenom: f.prenom!,
        email: f.email!,
        telephone: f.telephone!,
        abonnement: f.abonnement as 'basic' | 'premium' | 'vip',
        statut: 'en_attente',
        dateInscription: new Date().toISOString().slice(0, 10),
        avatar: 'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 30),
      };
      this.adherentService.addAdherent(nouvelAdherent);
      this.success = true;
      this.form.reset({ abonnement: 'basic' });
      this.submitted = false;
      setTimeout(() => {
        this.router.navigate(['/adherents']);
      }, 1500);
    }
  }
}