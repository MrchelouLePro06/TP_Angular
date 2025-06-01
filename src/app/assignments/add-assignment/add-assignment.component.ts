import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from '../assignment.class';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  providers: [provideNativeDateAdapter()],
  selector: 'app-add-assignment',
  imports: [CommonModule, FormsModule, MatInputModule, MatDatepickerModule, 
    MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent  {
  nomDevoir = "";
  dateDeRendu!:Date;
  matiere = "";
  eleve = "";
  remarque = "";

matieres = [
    {label: 'Web', value: 'Web'},
    {label: 'Big Data', value: 'Big Data'},
    {label: 'OS', value: 'OS'},
  ];
  selectedMatiere: string | null = null;

  constructor(private assignmentsService:AssignmentsService, 
              private router:Router) {}

  
onSubmit(event:any) {
    console.log(`On a soumis le formulaire nom = ${this.nomDevoir}, 
      dateDeRendu = ${this.dateDeRendu}`);
      if(this.nomDevoir == "" || this.dateDeRendu == null) {
        console.log("Formulaire invalide");
        return;
      }

      let a = new Assignment();
      a.nom = this.nomDevoir;
      a.dateDeRendu = this.dateDeRendu;
      a.rendu = false;
      a.matiere = this.selectedMatiere || undefined;
      a.eleve = this.eleve; 
      a.remarque = this.remarque;
      this.assignmentsService.addAssignment(a)
      .subscribe(message => {
        console.log(message);
       this.router.navigate(['/home']);
      });
  }

}
