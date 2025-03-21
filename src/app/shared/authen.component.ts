import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private validUsers = [
        { user: 'admin', password: 'admin' }
    ];
    private authentification = false;

    getValidUsers(): any[] {
        return this.validUsers;
    }
    addValidUser(user: string, password: string): void {
        const userExist = this.validUsers.find(u => u.user === user);
        if (!userExist) {
        this.validUsers.push({ user, password });
        console.log('Utilisateur ajouté avec succès.');
        } else {
            console.log('Cet utilisateur existe déjà.');
        }
    }
    isLoggedIn(): boolean {
        return this.authentification;
    }
    login(user: string, password: string): boolean {
        const validUser = this.validUsers.find(u => u.user === user && u.password === password);
        this.authentification = !!validUser;
        if (this.authentification) {
        console.log('Connexion réussie. Bienvenue ', user+'!');
        } else {
        console.log('Échec de la connexion. Utilisateur ou mot de passe incorrect.');
        }
        console.log('Authentification : ', this.authentification);
        return this.authentification;
    }

    logout(): void {
        this.authentification = false;
    }
}