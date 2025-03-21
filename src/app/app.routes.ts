import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { NavigationErrorComponent } from './navigation-error-component/navigation-error-component.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './CreateLog/create.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: AssignmentsComponent, canActivate: [AuthGuard]},
    {path: 'add', component: AddAssignmentComponent},
    {path: 'create', component: CreateComponent},
    {path: 'assignments/:id', component: AssignmentDetailComponent},
    {path: 'assignments/:id/edit', component: EditAssignmentComponent},
    {path: 'assignements/:id/edit', component: EditAssignmentComponent},

    {path: '**', component:NavigationErrorComponent}
];
