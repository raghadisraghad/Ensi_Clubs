import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-club-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-profile.component.html',
  styleUrl: './club-profile.component.scss',
})
export class ClubProfileComponent {
changeProfile($event: Event) {
throw new Error('Method not implemented.');
}
  userService = inject(UserService);
  authService = inject(AuthService);
  currentUser = this.authService.currentAccSignal;
  currentTab = 'profile';

  selectTab(tab: string) {
    this.currentTab = tab; 
    
  }
}
