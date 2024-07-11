import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../../../../types';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: this.fb.control('', { validators: [Validators.required] }),
    lastName: this.fb.control('', { validators: [Validators.required] }),
    class: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    username: this.fb.control('', { validators: [Validators.required] }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  ClubRegisterForm: FormGroup = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required] }),
    abrv: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required] }),
    password: this.fb.control('', { validators: [Validators.required] }),
    slogan: this.fb.control('', { validators: [Validators.required] }),
    description: this.fb.control('', { validators: [Validators.required] }),
  });

  onSubmit() {
    this.authService
      .register(
        `${environment.apiUrl}/register`,
        this.registerForm.getRawValue()
      )
      .subscribe((res) => {
        localStorage.setItem('token', res.user.token);
        localStorage.setItem('id', res.user._id);
        localStorage.setItem('type', res.type);
        this.authService.currentAccSignal.set(res.user);
        this.router.navigate(['/home']);
      });
  }

  onClubSubmit() {
    this.authService
      .register(
        `${environment.apiUrl}/registerClub`,
        this.ClubRegisterForm.getRawValue()
      )
      .subscribe((res) => {    
        localStorage.setItem('token', res.club.token);
        localStorage.setItem('type', res.type);
        localStorage.setItem('token', res.club.token);
        this.authService.currentAccSignal.set(res.club);
        this.router.navigate(['/home']);
      });
  }
}
