import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../../../types';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-members',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, RatingModule,ButtonModule],
  templateUrl: './edit-members.component.html',
  styleUrl: './edit-members.component.scss'
})
export class EditMembersComponent {

  //===[Inputs]===//
@Input() display: boolean = false;
@Input() header!: string;
@Input() member: Member = {
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
};
//===[Outputs]===//
@Output() confirm = new EventEmitter<Member>();
@Output() displayChange = new EventEmitter<Boolean>();
//===[Methodes]===//

onConfirm() {
  this.confirm.emit(this.member);
  this.display = false;
  this.displayChange.emit(this.display);
}
onCancel() {
  this.display = false;
  this.displayChange.emit(this.display);
}
}
