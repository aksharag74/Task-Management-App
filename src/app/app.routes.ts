import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { TaskListComponent } from './features/tasks/pages/task-list/task-list.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'tasks', component:TaskListComponent}
];
