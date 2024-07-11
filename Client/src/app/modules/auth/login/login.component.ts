import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  fb = inject(NonNullableFormBuilder);
  router = inject(Router)

  loginForm: FormGroup = this.fb.group({
    username: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });
  

  onSubmit() {
    this.authService
      .login(`${environment.apiUrl}/login`, this.loginForm.getRawValue())
      .subscribe((res) => {      
        localStorage.setItem('token', res.entity.token);
        this.authService.currentUserSignal.set(res.entity);
        this.router.navigate(["/"])
      });
  }
}
