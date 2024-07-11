import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { User } from '../../../../types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../../environment/environment';
import { ClubService } from '../../club/services/club.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  clubService = inject(ClubService)
  requestEvents : any
  requestClubs : any
  fb = inject(FormBuilder);
  currentTab = 'profile';
  currentUser:any
  errorMessage = '';
  changeProfile(event: any) {
    const target = event.target.files[0];

    const formData = new FormData();
    formData.set('profile_pic', target);

    this.userService
      .updateProfile(
        `${environment.apiUrl}/user/${
          this.authService.currentAccSignal()._id
        }/upload`,
        formData
      )
      .subscribe({
        next: (res) => {
         
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  get profileImage(): string {
    const profile = this.authService.currentAccSignal()?.profile;
    return profile ?? '../../../../assets/logos/ensi.png';
  }

  getById(id: any): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.currentUser = data;
      },
      (error) => {
        console.error(`Errfetching usor er with ID ${id}:`, error);
        this.errorMessage = 'Failed to fetch user details.';
      }
    );
  }

  selectTab(tab: string) {
    this.currentTab = tab;
  }

  ProfileForm: FormGroup = this.fb.group({
    firstName: this.fb.control('', { validators: [Validators.required] }),
    lastName: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required] }),
    phone: this.fb.control('', { validators: [Validators.required] }),
    password: this.fb.control('', { validators: [Validators.required] }),
  });

  onSubmit() {
    this.userService.editUser(
      `${environment.apiUrl}/user/`,
      this.ProfileForm.getRawValue()
    ).subscribe({
      next:(res)=>{

      },
      error:(error)=>{
        console.log(error);
        
      }
    });
  }

  fetchUser(){
    const id = localStorage.getItem('id');
    console.log(id);
    
    this.userService.getUserById(`${environment.apiUrl}/user/${id}`).subscribe({
      next: (res: any) => {
        this.currentUser = res;
       
        
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

     ngOnInit() {
    const id = localStorage.getItem('id')
       this.getById(id)
      this.fetchRequestsClubs()
     this.fetchRequestsEvents()
     console.log(this.currentUser);
     
   
    
    
    
  }

  fetchRequestsClubs(){
    this.clubService.getUnaproveClub(`${environment.apiUrl}/unaproved`).subscribe({
      next: (res: any) => {
        this.requestClubs = res;
        console.log(this.requestClubs.clubs);
        
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchRequestsEvents(){
    this.clubService.getUnaproveEvent(`${environment.apiUrl}/event/unaproved`).subscribe({
      next: (res: any) => {
        this.requestEvents = res.clubs;
        console.log(this.requestEvents);
        
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  }

