
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

    const user = {
      id: Date.now(),                 
      name: formValue.username,       
      email: formValue.email,
      password: formValue.password    
    };

    localStorage.setItem('user', JSON.stringify(user));

       this.successMessage = "Logged in successfully ✅";

    setTimeout(() => {
      this.successMessage = "";
      this.router.navigate(['/tasks']);
    }, 1000);
  }
}