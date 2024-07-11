import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../../../types';
import { Router } from '@angular/router';


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
  router =inject(Router)
  currentUser = this.authService.currentAccSignal
  

  getToken(){
    return localStorage.getItem('token')
  }

  getType(){
    return localStorage.getItem('type')
  }

  logout(){
    this.authService.logout()
    
    
  }
  ngOnInit(){
    
  }

  profileRedirect() {

    if( this.getType()=="user"){
      this.router.navigate(["/profile/user"])
    }
    else
    if( this.getType()=="club")
    this.router.navigate(["/profile/club"])
    }
    
    allRedirect() {
      this.router.navigate(["/home"])
      }
  }


   
