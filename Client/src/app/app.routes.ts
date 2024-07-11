import { Routes } from '@angular/router';
import { GuardService } from './modules/auth/guard.service';



export const routes: Routes = [
    {
        path:'club',
        loadChildren:()=>import('./modules/club/club.module').then(
          (m)=>m.ClubModule
        ),
        canActivate:[GuardService]
    },

    {
      path:'',
      loadChildren:()=>import('./modules/auth/auth.module').then(
        (m)=>m.AuthModule
      ),
    },

   {
      path:"home",
        loadChildren:()=>import('./modules/core/core.module').then(
          (m)=>m.CoreModule
        ),
      canActivate:[GuardService]
    },

    {
      path:"profile",
        loadChildren:()=>import('./modules/user/user.module').then(
          (m)=>m.UserModule
        ),
      canActivate:[GuardService]  
    },

      
];
