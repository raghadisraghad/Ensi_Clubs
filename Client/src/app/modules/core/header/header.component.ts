import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../../../types';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconFieldModule,InputIconModule,ButtonModule,MenuModule,ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items:MenuItem = {}
  authService = inject(AuthService)
  currentUser = this.authService.currentUserSignal
  token:any

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    this.authService.logout()
    
    
  }
  ngOnInit(){
    
    
  }
}
