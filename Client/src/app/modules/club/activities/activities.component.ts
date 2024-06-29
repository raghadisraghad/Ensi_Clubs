import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, ViewChild } from '@angular/core';
import { Event } from '../../../../types';
import { EditPopupComponent } from '../../shared/edit-popup/edit-popup.component';
import { ClubService } from '../services/club.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

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

@Input() events:Event[] = []
@ViewChild('deleteButton') deleteButton:any;
clubService = inject(ClubService)
confirmationService=inject(ConfirmationService)
displayAddPopup = false;
displayEditPopup = false;
displayDeletePopup = false;

selectedEvent: Event = {
  _id:"",
  title: '',
  date: new Date,
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
  this.clubService
    .addEvent('http://localhost:3000/event/667cc583a8cf9678c64ea801', event)
    .subscribe({
      next: (data) => {
        console.log(data);
        
      },

      error: (error) => {
        console.error(error);
      },
    });
}

editEvent(event: Event) {
  console.log(event);
  
  this.clubService
    .editEvent(`http://localhost:3000/event/667cc583a8cf9678c64ea801/${event._id}`, event)
    .subscribe({
      next: (data) => {
        console.log(data);
        
      },

      error: (error) => {
        console.error(error);
      },
    });
}

deleteEvent(id: string) {
  this.clubService
    .deleteEvent(`http://localhost:3000/event/667cc583a8cf9678c64ea801/${id}`)
    .subscribe({
      next: (data) => {
        console.log(data);
      },

      error: (error) => {
        console.error(error);
      },
    });
}


confirmDelete(event:any){
    
  this.confirmationService.confirm({
    target:this.deleteButton.nativeElement,
    message:"are u sure ? ",accept:()=>{this.deleteEvent(event._id)}
  })
}


ngOnInit(){
  console.log(this.events);
  
}

}



