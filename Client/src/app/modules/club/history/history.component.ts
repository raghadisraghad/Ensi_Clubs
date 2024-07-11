import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club,Event } from '../../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() club!:Club
  @Output() clubChange=new EventEmitter<Club>
  events:Event[] =[]


  ngOnInit(){
    this.events=this.club.events
    this.events.forEach(event => {
      event.date = this.extractDate(event.date.toDateString());
    });
  
  }
  
  extractDate(dateString: string): any {
    return dateString.split('T')[0];
  }
  
}
