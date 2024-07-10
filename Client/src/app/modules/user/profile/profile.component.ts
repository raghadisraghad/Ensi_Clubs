import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { User } from '../../../../types';
import { NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
userService = inject(UserService)
currentUser!:User
currentTab = "profile"




changeProfile(event:any) {
  const target  = event.target.files[0]
  
  const formData = new FormData();
    formData.set('profile_pic',target);
    
  const id="6689cbd939015cc484403f6d"
  console.log(target);
  
  this.userService.updateProfile(`http://localhost:3000/user/upload`,formData)
  .subscribe({
    next: (res) => {
      console.log(res);
      
      
    },

    error: (error) => {
      console.error(error);
    },
  });
  }

  
  
  
  selectTab(tab: string) {
    this.currentTab = tab; 
    
    
  }

}


