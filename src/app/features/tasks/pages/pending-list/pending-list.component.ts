import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatMenuModule } from "@angular/material/menu";
import { Observable, map } from 'rxjs';
import { TaskService } from '../../../../core/services/task.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Task } from '../../../../core/models/task.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { Router } from "@angular/router";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-pending-list',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,TranslateModule,MatMenuModule,MatToolbarModule,
  ],
  templateUrl: './pending-list.component.html',
  styleUrl: './pending-list.component.css',
})
export class PendingTasksComponent implements OnInit {

  displayedColumns = [ 'title', 'description', 'priority','dueDate'];

  pendingTasks$!: Observable<Task[]>;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private auth: AuthService,
    private translate: TranslateService,
    public themeService: ThemeService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
  }
  username: string | null = null;
  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.username = user.name;
      
    }
    this.taskService.refreshTasks();
    this.pendingTasks$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter(t => !t.completed))
    );
  }

  toggleCompleted(task: Task): void {
    this.taskService.updateTask({ ...task, completed: !task.completed });
  }
  clearMyTasks(): void {
    const ok = confirm("Are you sure you want to delete all tasks?");
    if (ok) {
      this.taskService.clearMyTasks();
    }
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  }
  confirmDelete(id: number): void {
    const ok = confirm("Are you sure you want to delete this task?");
    if (ok) this.taskService.deleteTask(id);
  }
  logout(): void {
    const ok = confirm("Are you sure you want to logout?");
    if (ok) {
      this.auth.logout();
      alert("Logout successfully!");
      this.router.navigate(['/login']);
    }
  }
}
