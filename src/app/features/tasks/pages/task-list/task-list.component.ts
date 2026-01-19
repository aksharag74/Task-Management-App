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

import { TaskService } from "../../../../core/services/task.service";
import { AuthService } from "../../../../core/services/auth.service";
import { Task } from "../../../../core/models/task.model";
import { Observable, map} from "rxjs";

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

  constructor(private router: Router,
    private taskService: TaskService,
    private auth:AuthService
  ) {}
  isEditMode = false;
  editTaskId: number | null = null;

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

  tasks$!: Observable<Task[]>;
  pendingTasks$!: Observable<Task[]>;
  completedTasks$!: Observable<Task[]>;

  newTask:Task = {
    id: 0,
    title: "",
    description: "",
    priority: "Low",
    dueDate: new Date(),
    completed: false,
    userId:0,
  };

  ngOnInit(): void {
    this.tasks$=this.taskService.tasks$;

    this.pendingTasks$=this.tasks$.pipe(
      map(tasks => tasks.filter(t=> !t.completed))
    );
    this.completedTasks$=this.tasks$.pipe(
      map(tasks => tasks.filter(t=>t.completed))
    );
    const user = this.auth.getCurrentUser();
    if (user) {
      this.username = user.name;
      this.taskService.refreshTasks();
    } 
  }

  addTask(): void {
    const user = this.auth.getCurrentUser();
    if(!user){
      alert("User not logged in!");
      return;
    }
    if(this.isEditMode && this.editTaskId !== null){
      const updatedTask:Task={
        ...this.newTask,
        id:this.editTaskId,
        userId:user.id,
      };
    this.taskService.updateTask(updatedTask);
    this.resetForm();
    return;
    }

    const taskToAdd: Task={
      ...this.newTask,
      id:Date.now(),
      userId: user.id,
      completed:false,
    };
    this.taskService.addTask(taskToAdd);
    this.resetForm();
  }

  toggleCompleted(task: Task): void {
    this.taskService.updateTask({ ...task, completed: !task.completed });
  }
  editTask(task: Task): void {
  this.showForm = true;
  this.isEditMode = true;
  this.editTaskId = task.id;

  this.newTask = { ...task }; // fill form with existing task data
  }

  confirmDelete(id: number): void {
  const ok = confirm("Are you sure you want to delete this task?");
  if (ok) {
    this.taskService.deleteTask(id);
  }
  }
  cancel(): void {
    this.resetForm();
  }
  logout(): void {
  const ok = confirm("Are you sure you want to logout?"); 
  if (ok) {
    this.auth.logout();
    alert("Logout successfully!");
    this.router.navigate(['/login']); 
  }
}
  private resetForm(): void {
    const user = this.auth.getCurrentUser();

    this.newTask = {
      id: 0,
      title: "",
      description: "",
      priority: "Low",
      dueDate: new Date(),
      completed: false,
      userId:user?user.id:0,
    };
    this.showForm = false;
    this.isEditMode= false;
    this.editTaskId = null;
  }
}
