import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, NgModule, Output, ViewChild } from '@angular/core';
import { Club, Event } from '../../../../types';
import { EditPopupComponent } from '../../shared/edit-popup/edit-popup.component';
import { ClubService } from '../services/club.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgModel } from '@angular/forms';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ConfirmPopupModule,
    CommonModule,
    EditPopupComponent,
    ButtonModule,
    ToastModule,
    
  ],
  providers:[ConfirmationService],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})


export class ActivitiesComponent {
edit: EventEmitter<Event> = new EventEmitter<Event>();
delete: EventEmitter<Event> = new EventEmitter<Event>();

@Input() club!:Club
@Output() clubChange=new EventEmitter<Club>
@ViewChild('deleteButton') deleteButton:any;
events:Event[] =[]
clubService = inject(ClubService)
confirmationService=inject(ConfirmationService)
displayAddPopup = false;
displayEditPopup = false;
displayDeletePopup = false;

selectedEvent: Event = {
  _id:"",
  title: '',
  date:new Date(2024,1,1),
  time:"00:00",
  description: '',
  location: '',
  ticket: false,
  collab: [],
  archived: false,
  price: 0,
  poster: ''
};

toggleEditPopup(event: Event) {
  this.selectedEvent = event;
  this.displayEditPopup = true;
}

toggleAddPopup() {
  this.displayAddPopup = true;
}

toggleDeletePopup(event: Event) {
  if (!event._id) {
    return;
  }
  this.deleteEvent(event._id);
}

onConfirmeAdd(event: Event) {
  this.addEvent(event);
  this.displayAddPopup = false;
}
onConfirmeEdit(event: Event) {
  this.editEvent(event);
  this.displayAddPopup = false;
}

addEvent(event: Event) {
  delete event._id;
  console.log(event);
  
  this.clubService
    .addEvent(`http://localhost:3000/event/${this.club._id}`, event)
    .subscribe({
      next: (data) => {
        this.refreshClub() 
        
      },

      error: (error) => {
        console.error(error);
      },
    });
}

editEvent(event: Event) {
  console.log(event);
  
  this.clubService
    .editEvent(`http://localhost:3000/event/${this.club._id}/${event._id}`, event)
    .subscribe({
      next: (data) => {
        this.refreshClub()
        
      },

      error: (error) => {
        console.error(error);
      },
    });
}

deleteEvent(id: string) {
  this.clubService
    .deleteEvent(`http://localhost:3000/event/${this.club._id}/${id}`)
    .subscribe({
      next: (data) => {
        this.refreshClub()
      },

      error: (error) => {
        console.error(error);
      },
    });
}


confirmDelete(event:any){
    
  this.confirmationService.confirm({
    target:this.deleteButton.nativeElement,
    message:"are u sure ? ",accept:()=>{this.deleteEvent(event._id);this.refreshClub()}
  })
}


ngOnInit(){
  this.events=this.club.events
  this.events.forEach(event => {
    event.date = this.extractDate(event.date);
  });

}

extractDate(dateString: any): any {
  return dateString.split('T')[0];
}


refreshClub(){
    this.clubService
      .getClubById(`${environment.apiUrl}/club/${this.club._id}`)
      .subscribe({
        next: (club: Club) => {
          this.club = club;
          this.ngOnInit()
          this.clubChange.emit(club);
          
          
          
          
        },
        error: (error) => {
          console.error(error);
        },
      });
  }


}



