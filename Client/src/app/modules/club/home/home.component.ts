import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  
  slides = [
    { image: '../../../../assets/logos/ensi.png', caption: 'First Slide' },
    { image: '../../../../assets/logos/ensi.png', caption: 'First Slide' },
    { image: '../../../../assets/logos/ensi.png', caption: 'First Slide' },
    { image: '../../../../assets/logos/ensi.png', caption: 'First Slide' },
    { image: '../../../../assets/logos/ensi.png', caption: 'Second Slide' },
    { image: '../../../../assets/logos/ensi.png', caption: 'Third Slide' }
  ];



//

}


