import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Club } from '../../../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() club!:Club
  @Output() clubChange=new EventEmitter<Club>

  
  

  ngOnInit(){
    
    
  }


//

}


