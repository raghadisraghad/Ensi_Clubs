import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Club, User } from '../../../../types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiService=inject(HttpClient);
  router= inject(Router)

  currentAccSignal = signal<any |Club| undefined | null>(undefined); 

  login = (url:string,body:User):Observable<any>=>{
    return this.apiService.post(url,body,{})
  }

  register = (url:string,body:User):Observable<any>=>{
    return this.apiService.post(url,body,{})
  }

  logout() {
    this.router.navigate(["/"])
    localStorage.setItem('token','')
    this.currentAccSignal.set(null)
    
    
  }

  


}
