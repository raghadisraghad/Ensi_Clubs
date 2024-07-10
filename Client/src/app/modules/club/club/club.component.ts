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
currentClub:Club ={
  _id: '',
  name: '',
  description: '',
  approved:false,
  logo: '',
  slogan: '',
  rate: 0,
  members: [],
  comments: [],
  events: []
}



ngOnInit(){
  this.currentClub = history.state.club
}


selectTab(tab: string) {
  this.currentTab = tab; 
  
  
}

}
