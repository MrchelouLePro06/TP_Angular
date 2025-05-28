import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authen.component';
import { SetUser } from '../user/user.component';

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
    this.authService.register(this.user, this.password).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: err => {
      alert('Erreur lors de la création du compte');
      console.error(err);
    }
  });
  /*
    console.log("Server started");
    const newUser = new SetUser(this.user, this.password, false);
    newUser.insertUser();
    this.router.navigate(['/login']);*/
  }
}
