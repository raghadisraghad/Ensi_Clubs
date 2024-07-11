import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable,map,of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../../../../types';
import { Router } from '@angular/router';
import {environment} from '../../../../environment/environment'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
fb= inject(NonNullableFormBuilder)
authService = inject(AuthService)
router = inject(Router)

registerForm:FormGroup = this.fb.group({
  firstName:this.fb.control('',{validators:[Validators.required,]}),
  lastName:this.fb.control('',{validators:[Validators.required,]}),
  class:this.fb.control('',{validators:[Validators.required,]}),
  email:this.fb.control('',{validators:[Validators.required,Validators.email]}),
  username:this.fb.control('',{validators:[Validators.required]}),
  password:this.fb.control('',{validators:[Validators.required,Validators.minLength(8)]}),

})

onSubmit(){
  this.authService.register(`${environment}/register`,this.registerForm.getRawValue()).subscribe((res)=>{
    localStorage.setItem('token',res.user.token)
    this.authService.currentUserSignal.set(res.user)
    this.router.navigate(["/"])
  })
}

}
