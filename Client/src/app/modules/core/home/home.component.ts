import { Component, EventEmitter, Output } from '@angular/core';
import { inject } from '@angular/core';
import { ClubService } from '../../club/services/club.service';
import { Clubs,Club } from '../../../../types';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


clubApi= inject(ClubService)
clubs:Club[]=[]
router=inject(Router)




fetchClubs() {
  this.clubApi
    .getClubs('http://localhost:3000/club')
    .subscribe({
      next: (clubs: Club[]) => {
        this.clubs = clubs;
        console.log(clubs);
        
       
      },
      error: (error) => {
        console.error(error);
      },
    });
}

ngOnInit() {
  this.fetchClubs();
}

OnSelectClub(club: Club){
  
  this.router.navigate(["/club"],{state:{club}})
}


}
