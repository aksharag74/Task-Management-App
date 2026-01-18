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

  private getAllTasks(): Task[]{
    return this.storage.get<Task[]>("tasks") || [];
  }

  private saveAllTasks(tasks:Task[]): void {
    this.storage.set("tasks", tasks);
  }

  refreshTasks(): void {
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.tasksSubject.next([]);
      return;
    }
    const tasks = this.getAllTasks().filter((t) => t.userId === user.id);
    this.tasksSubject.next(tasks);
  }
  addTask(task: Task): void {
    const allTasks = this.getAllTasks();
    allTasks.push(task);
    this.saveAllTasks(allTasks);
    this.refreshTasks(); // update observable
  }

  updateTask(task: Task): void {
    const allTasks = this.getAllTasks();
    const index = allTasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      allTasks[index] = task;
      this.saveAllTasks(allTasks);
      this.refreshTasks();
    }
  }

  deleteTask(id: number): void {
    const allTasks = this.getAllTasks().filter((t) => t.id !== id);
    this.saveAllTasks(allTasks);
    this.refreshTasks();
  }

  clearMyTasks(): void {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    const allTasks = this.getAllTasks().filter((t) => t.userId !== user.id);
    this.saveAllTasks(allTasks);
    this.refreshTasks();
  }
}
