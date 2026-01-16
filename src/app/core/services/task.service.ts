import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { AuthService } from "./auth.service";
import { Task } from "../models/task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private storage: StorageService, private auth: AuthService) {}

  getTasks(): Task[] {
    const user = this.auth.getCurrentUser();
    const tasks = this.storage.get<Task>("tasks"); // returns Task[]
    return tasks.filter((t) => t.userId === user?.id);
  }

  addTask(task: Task): void {
    const tasks = this.storage.get<Task>("tasks");
    tasks.push(task);
    this.storage.set("tasks", tasks);
  }

  updateTask(task: Task): void {
    const tasks = this.storage.get<Task>("tasks");
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      tasks[index] = task;
      this.storage.set("tasks", tasks);
    }
  }

  deleteTask(id: number): void {
    const tasks = this.storage.get<Task>("tasks").filter((t) => t.id !== id);
    this.storage.set("tasks", tasks);
  }

  clearMyTasks(): void {
    const user = this.auth.getCurrentUser();
    const tasks = this.storage.get<Task>("tasks").filter((t) => t.userId !== user?.id);
    this.storage.set("tasks", tasks);
  }
}
