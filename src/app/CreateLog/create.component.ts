import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authen.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  user = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onCreate(): void {
    console.log('Tentative de création de compte avec', this.user, this.password);
    this.authService.addValidUser(this.user, this.password);
    alert('Compte créé avec succès');
    this.router.navigate(['/login']);
  }
}
