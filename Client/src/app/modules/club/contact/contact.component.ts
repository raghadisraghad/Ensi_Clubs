import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../../../../types';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input()club!:Club
  @Output() clubChange=new EventEmitter<Club>
  
  
}
