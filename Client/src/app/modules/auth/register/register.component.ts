import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable,map,of } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
fb= inject(NonNullableFormBuilder)

registerForm:FormGroup = this.fb.group({
  firstName:this.fb.control(''),
  lastName:this.fb.control('',{validators:[Validators.required,]}),
  class:this.fb.control('',{validators:[Validators.required,]}),
  email:this.fb.control('',{validators:[Validators.required,Validators.email]}),
  password:this.fb.control('',{validators:[Validators.required,Validators.minLength(8)]}),

})

onSubmit(){
  console.log(this.registerForm.value);
  
}

}
