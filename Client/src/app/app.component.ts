import { Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/core/header/header.component';
import { FooterComponent } from './modules/core/footer/footer.component';
import { Club } from '../types';
import { SharedService } from './modules/shared/services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
sharedService=inject(SharedService)
router=inject(Router)
currentClub!:Club

ngOnInit() {
  this.sharedService.clubSelected.subscribe((club: Club) => {
  this.currentClub=club
  this.sharedService.emitAppSelectedClub(this.currentClub)
  
    this.router.navigate(['/club'])

  });

  
  
}

}
