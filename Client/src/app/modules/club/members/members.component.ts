import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Club, Member } from '../../../../types';
import { ConfirmationService } from 'primeng/api';
import { ClubService } from '../services/club.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { EditMembersComponent } from '../../shared/edit-members/edit-members.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule,ButtonModule,ToastModule,EditMembersComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  @Input() club!: Club;
  @Output() clubChange = new EventEmitter<Club>();
  @ViewChild('deleteButton') deleteButton:any;
  clubService = inject(ClubService)
  confirmationService=inject(ConfirmationService)
  members: Member[] = [];
  displayAddPopup = false;
  displayEditPopup = false;
  displayDeletePopup = false;

  selectedEvent: Member = {
    user:{
      _id: '',
      firstName: '',
      lastName: '',
      profile: '',
      phone: '',
      class: '',
      admin: false,
      username: '',
      email: '',
      password: '',
      token: ''
    },
    role: '',
    absence: 0
  }

  toggleEditPopup(member: Member) {
    this.selectedEvent = member;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(member: Member) {
    if (!member._id) {
      return;
    }
    this.deleteMember(member._id);
  }

  onConfirmeAdd(member: Member) {
    this.addMember(member);
    this.displayAddPopup = false;
  }
  onConfirmeEdit(member: Member) {
    this.editMember(member);
    this.displayAddPopup = false;
  }

  addMember(member: Member) {
    delete member._id;
    console.log(member);

    this.clubService
      .addMember(`http://localhost:3000/event/${this.club._id}`, member)
      .subscribe({
        next: (data) => {
          this.refreshClub();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  editMember(member: Member) {
    console.log(member);

    this.clubService
      .editMember(
        `http://localhost:3000/event/${this.club._id}/${member._id}`,
        member
      )
      .subscribe({
        next: (data) => {
          this.refreshClub();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  deleteMember(id: string) {
    this.clubService
      .deleteEvent(`http://localhost:3000/event/${this.club._id}/${id}`)
      .subscribe({
        next: (data) => {
          this.refreshClub();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  confirmDelete(member: any) {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'are u sure ? ',
      accept: () => {
        this.deleteMember(member._id);
        this.refreshClub();
      },
    });
  }

  ngOnInit() {
    this.members = this.club.members;
  }

  extractDate(dateString: any): any {
    return dateString.split('T')[0];
  }

  refreshClub() {
    this.clubService
      .getClubById(`http://localhost:3000/club/${this.club._id}`)
      .subscribe({
        next: (club: Club) => {
          this.club = club;
          this.ngOnInit();
          this.clubChange.emit(club);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  
}
