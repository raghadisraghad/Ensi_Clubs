import { Component, inject, NgModule } from '@angular/core';
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
  router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: this.fb.control('', {
      validators: [Validators.required, ],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, ],
    }),
  });

  onSubmit() {
    console.log(this.loginForm.getRawValue());
    
    this.authService
      .login(`${environment.apiUrl}/login`, this.loginForm.getRawValue())
      .subscribe((res) => {
        localStorage.setItem('token', res.entity.token);
        localStorage.setItem('type', res.type);
        this.authService.currentUserSignal=res.entity;
        
        
        this.router.navigate(['/home']);
      });
  }
}
