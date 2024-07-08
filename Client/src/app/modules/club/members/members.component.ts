import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club, Member } from '../../../../types';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  @Input() club!:Club
  @Output() clubChange=new EventEmitter<Club>

  members:Member[]=[]

  ngOnInit(){
    this.members = this.club.members
  }
}
