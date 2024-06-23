import { Component, EventEmitter, Injectable, Input, NgModule } from '@angular/core';
import { Club } from '../../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-club',
  standalone: false,
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {

club!:Club 


}
