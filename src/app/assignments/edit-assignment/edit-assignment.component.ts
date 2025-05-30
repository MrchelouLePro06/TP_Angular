import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.class';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  note?: number;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
 
  ngOnInit() {
    // On va récupérer l'id dans la route (dans l'URL)
    // on récupère l'assignment à modifier
    const _id = this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(_id)
    .subscribe(a => {
      this.assignment = a;
      if (this.assignment) {
        this.nomAssignment = this.assignment.nom;
        this.dateDeRendu = this.assignment.dateDeRendu;
        this.note = this.assignment.note;
      }
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
 }
 
 