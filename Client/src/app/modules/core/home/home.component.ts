import { Component } from '@angular/core';
import { ClubModule } from '../../club/club.module';
import { ClubComponent } from '../../club/club/club.component';
import { ClubService } from '../../club/services/club.service';
import { Clubs } from '../../../../types';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //constructor(private clubService:ClubService)
clubs!:Clubs

}
