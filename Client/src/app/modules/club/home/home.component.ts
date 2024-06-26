import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
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


