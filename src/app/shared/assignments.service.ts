import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.class';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './authen.component';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  //backendURL = 'http://localhost:8081/api/assignments';
  backendURL = 'https://tp-angular.onrender.com/api/assignments'; // URL du backend pour les assignments

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupère les assignments paginés depuis le backend
  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    console.log("Service:getAssignmentsPagines appelée !");
    const URI = this.backendURL + '?page=' + page + '&limit=' + limit;
    return this.http.get<any>(URI);
  }

  // Récupère un assignment par son id
  getAssignment(_id: string): Observable<Assignment | undefined> {
    console.log("Service:getAssignment appelée avec id = " + _id);
    const URI = this.backendURL + '/' + _id;
    return this.http.get<Assignment>(URI);
  }

  // Ajoute un nouvel assignment
  addAssignment(assignment: Assignment): Observable<string> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.post<string>(
      this.backendURL,
      assignment,
      { headers }
    );
  }

  // Met à jour un assignment
  updateAssignment(assignment: Assignment): Observable<string> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.put<string>(
      this.backendURL + '/' + assignment._id,
      assignment,
      { headers }
    );
  }

  // Supprime un assignment
  deleteAssignment(assignment: Assignment): Observable<string> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.delete<string>(
      this.backendURL + '/' + assignment._id,
      { headers }
    );
  }
}