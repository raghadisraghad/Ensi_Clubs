import { Component, EventEmitter, inject, Injectable, Input, NgModule } from '@angular/core';
import { Club } from '../../../../types';
import { SharedService } from '../../shared/services/shared.service';
import { ClubService } from '../services/club.service';



@Component({
  selector: 'app-club',
  standalone: false,
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {
clubService = inject(ClubService)
currentTab:string = "home"  
currentClub!:Club 

getClub() {
  this.clubService
    .getClubById('http://localhost:3000/club/667cc583a8cf9678c64ea801')
    .subscribe({
      next: (club: Club) => {
        this.currentClub = club;
        console.log(club);
        
        
      },
      error: (error) => {
        console.error(error);
      },
    });
}

ngOnInit(){
  this.getClub()
}


selectTab(tab: string) {
  this.currentTab = tab; 
  console.log(tab);
  
}

}
