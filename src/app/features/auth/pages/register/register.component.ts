import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent{
  registerForm: FormGroup;
  errorMessage = "";
  successMessage = "";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  )
  {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    const ok = this.auth.register(name, email, password);

    if (!ok) {
      this.errorMessage = "Email already exists";
      this.successMessage = "";
      return;
    }
    this.successMessage = "Registered successfully";
    this.errorMessage = "";

    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 1000);
  }
}