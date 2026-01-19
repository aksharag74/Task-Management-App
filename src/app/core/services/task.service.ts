import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";
import { AuthService } from "./auth.service";
import { Task } from "../models/task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  private tasksSubject= new BehaviorSubject<Task[]>([]);
  tasks$=this.tasksSubject.asObservable();

  constructor(private storage: StorageService, private auth: AuthService) {
    this.refreshTasks();
  }

  private getTaskKey(): string{
    const user=this.auth.getCurrentUser();
    return user ? `tasks_${user.id}`:"tasks_guest";
  }

  private getMyTasks(): Task[] {
    return this.storage.get<Task[]>(this.getTaskKey()) || [];
  }

  private saveMyTasks(tasks: Task[]): void {
    this.storage.set(this.getTaskKey(), tasks);
  }

  refreshTasks(): void {
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.tasksSubject.next([]);
      return;
    }
    const tasks = this.getMyTasks();
    this.tasksSubject.next(tasks);
  }
  addTask(task: Task): void {
    const tasks = this.getMyTasks();
    tasks.push(task);
    this.saveMyTasks(tasks);
    this.refreshTasks();
  }

  updateTask(task: Task): void {
    const allTasks = this.getMyTasks();
    const index = allTasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      allTasks[index] = task;
      this.saveMyTasks(allTasks);
      this.refreshTasks();
    }
  }

  deleteTask(id: number): void {
    const allTasks = this.getMyTasks().filter((t) => t.id !== id);
    this.saveMyTasks(allTasks);
    this.refreshTasks();
  }
  
    clearMyTasks(): void {
    this.saveMyTasks([]);
    this.refreshTasks();
  }
}
