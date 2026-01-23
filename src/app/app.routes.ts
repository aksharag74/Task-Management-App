import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { TaskListComponent } from './features/tasks/pages/task-list/task-list.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { CompletedTaskComponent } from './features/tasks/pages/completed-list/completed-list.component';
import { PendingTasksComponent } from './features/tasks/pages/pending-list/pending-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'completed', component: CompletedTaskComponent },
  { path: 'pending', component: PendingTasksComponent },
  { path: 'tasks', component:TaskListComponent}
];
