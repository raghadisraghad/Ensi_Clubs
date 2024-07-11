import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
router = inject(Router)
  canActivate():boolean{
    if(localStorage.getItem('token'))
      return true
    else{
    this.router.navigate(["/"])
    return false}
  }
  
}
