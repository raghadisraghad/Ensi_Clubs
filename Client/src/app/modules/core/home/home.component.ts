import { Component, EventEmitter, Output } from '@angular/core';
import { inject } from '@angular/core';
import { ClubService } from '../../club/services/club.service';
import { Clubs,Club } from '../../../../types';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

eventService=inject(SharedService)
clubApi= inject(ClubService)
clubs:Club[]=[]
router=inject(Router)




fetchClubs() {
  this.clubApi
    .getClubs('http://localhost:3000/club')
    .subscribe({
      next: (clubs: Club[]) => {
        this.clubs = clubs;
        console.log(this.clubs);
      },
      error: (error) => {
        console.error(error);
      },
    });
}

ngOnInit() {
  this.fetchClubs();
}

OnselectClub(club: Club){
this.eventService.emitClubSelected(club)

}


}
