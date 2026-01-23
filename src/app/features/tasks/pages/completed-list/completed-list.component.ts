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
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-completed-list',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,TranslateModule, MatToolbarModule, MatMenuModule, MatPaginatorModule
  ],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.css',
})
export class CompletedTaskComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'description', 'priority', 'dueDate'];
  completedDataSource = new MatTableDataSource<Task>([]);
  completedTasks$!: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private auth: AuthService,
    private router: Router,
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
      this.taskService.refreshTasks();
    }

    this.completedTasks$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter(t => t.completed))
    );
    this.completedTasks$.subscribe(tasks => {
  this.completedDataSource.data = tasks;
});
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.completedDataSource.paginator = this.paginator;
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
