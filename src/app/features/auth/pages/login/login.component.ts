import { RouterModule } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from "../../../../core/services/task.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',   
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
    loginForm: FormGroup;
    errorMessage = '';
    successMessage = '';
    constructor(
        private fb: FormBuilder,
        private auth:AuthService,
        private taskService: TaskService,
        private router:Router
    ){
         this.loginForm = this.fb.group({
      username:['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    }
    onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;

    const { email, password } = this.loginForm.value;

  const ok = this.auth.login(email, password);

  if (!ok) {
    this.errorMessage = "Invalid email or password";
    return;
  }

  this.errorMessage = "";
  this.successMessage = "Logged in successfully";

  this.taskService.refreshTasks();

    setTimeout(() => {
      this.successMessage = "";
      this.router.navigate(['/tasks']);
    }, 1000);
  }
}