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
  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) {}

  islogged(): void{
    this.showToolbar=this.authService.isLoggedIn();
  }

  Logout(): void {
    this.authService.logout();
    this.showToolbar = false;
    window.location.href = '/login';
    console.log("Server started");
  }

  /*genererDonneesDeTest() {
    console.log("Génération des données de test");
    //this.assignmentsService.peuplerBD()

    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Toutes les données de test ont été insérées");

      // Je navigue vers la page qui affiche la liste des assignments
      window.location.href = '/home';
    });
  }*/
}
