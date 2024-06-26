import { Component, EventEmitter, Injectable, Input, NgModule } from '@angular/core';
import { Club } from '../../../../types';



@Component({
  selector: 'app-club',
  standalone: false,
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {

currentTab:string = "home"  
club!:Club 

selectTab(tab: string) {
  
  this.currentTab = tab;
  console.log(this.currentTab);
}

}
