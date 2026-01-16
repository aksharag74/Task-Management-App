import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [
    CommonModule,FormsModule,MatTableModule,MatCheckboxModule,MatButtonModule,MatChipsModule,MatFormFieldModule,
    MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatToolbarModule,MatIconModule,
  ],
  templateUrl: "./task-list.component.html",
  styleUrl: "./task-list.component.css",
})
export class TaskListComponent implements OnInit {
  constructor(private router: Router) {}
  username: string | null = null;
  showForm = false;
  displayedColumns = [
    "completed",
    "title",
    "description",
    "priority",
    "dueDate",
    "actions",
  ];
  dataSource: any[] = [];
  newTask = {
    id: 0,
    title: "",
    description: "",
    priority: "Low",
    dueDate: new Date(),
    completed: false,
  };
  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if (user) {
      this.username = JSON.parse(user).name;
    }
    this.loadTasks(); 
  }
  get pendingTasks() {
    return this.dataSource.filter((task) => !task.completed);
  }
  get completedTasks() {
    return this.dataSource.filter((task) => task.completed);
  }
  saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.dataSource));
  }
  loadTasks(): void {
    const savedTasks = localStorage.getItem("tasks");
    this.dataSource = savedTasks ? JSON.parse(savedTasks) : [];
  }
  addTask(): void {
    this.newTask.id = Date.now();
    this.dataSource = [...this.dataSource, { ...this.newTask }];
    this.saveTasks(); 
    this.resetForm();
  }
  deleteTask(id: number): void {
    this.dataSource = this.dataSource.filter((task) => task.id !== id);
    this.saveTasks(); 
  }
  confirmDelete(id: number): void {
  const ok = confirm("Are you sure you want to delete this task?");
  if (ok) {
    this.deleteTask(id);
  }
  }
  cancel(): void {
    this.resetForm();
  }
  logout(): void {
  const ok = confirm("Are you sure you want to logout?"); 
  if (ok) {
    localStorage.removeItem("user"); 
    localStorage.removeItem("tasks");
    alert("Logout successfully!");
    this.router.navigate(['/login']); 
  }
}
  private resetForm(): void {
    this.newTask = {
      id: 0,
      title: "",
      description: "",
      priority: "Low",
      dueDate: new Date(),
      completed: false,
    };
    this.showForm = false;
  }
}
