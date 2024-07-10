import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { User } from '../../../../types';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
currentUser!:User




changeProfile(event:any) {
  console.log("uploaded");
  console.log(event.target.files);


}
currentTab = "profile"
  selectTab(tab: string) {
    this.currentTab = tab; 
    
    
  }
}
