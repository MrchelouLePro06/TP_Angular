import { Component } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from './shared/assignments.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AuthService } from './shared/authen.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, 
    MatIconModule,RouterLink,MatToolbarModule,MatSidenavModule,MatListModule,CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  titre = 'Premier projet Angular';
  ajoutdevoir="Ajouter un devoir";
  opened=false;
  showToolbar = false;
  isAdmin = false;
  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) {}

  islogged(): void{
    this.showToolbar=this.authService.isLoggedIn();
  }

  Logout(): void {
    localStorage.removeItem('auth_token');
    this.authService.logout();
    this.showToolbar = false;
    window.location.href = '/login';
    console.log("Server started");
  }

ngOnInit() {
  this.authService.getCurrentUser().subscribe(user => {
    this.isAdmin = user && user.admin === true;
  });
}
}
