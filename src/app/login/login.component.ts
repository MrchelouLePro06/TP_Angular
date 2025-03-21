import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authen.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  password = '';
  constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {}

  onLogin(): void {
    console.log('Tentative de connexion avec', this.user, this.password);
    if (this.authService.login(this.user, this.password)) {
      console.log('Connexion réussie, redirection vers /home');
      this.appComponent.islogged();
      this.router.navigate(['/home']);
    } else {
      console.log('Échec de la connexion');
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }
  CreateLog(){
    this.router.navigate(['/create']);
  }
}