import { Component } from '@angular/core';
import { ClubModule } from '../../club/club.module';
import { ClubComponent } from '../../club/club/club.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClubComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
