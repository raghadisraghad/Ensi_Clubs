import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Event } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, RatingModule,ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
//===[Inputs]===//
@Input() display: boolean = false;
@Input() header!: string;
@Input() event: Event = {
  _id: '',
  title: '',
  date: new Date(),
  time:"",
  description: "",
  location: '',
  ticket: false,
  collab: [],
  archived: false,
  price: 0,
  poster: ''
};
//===[Outputs]===//
@Output() confirm = new EventEmitter<Event>();
@Output() displayChange = new EventEmitter<Boolean>();
//===[Methodes]===//

onConfirm() {
  this.confirm.emit(this.event);
  this.display = false;
  this.displayChange.emit(this.display);
}
onCancel() {
  this.display = false;
  this.displayChange.emit(this.display);
}
}
