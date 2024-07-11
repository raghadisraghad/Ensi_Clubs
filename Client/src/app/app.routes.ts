import { Routes } from '@angular/router';



export const routes: Routes = [
    {
        path:'club',
        loadChildren:()=>import('./modules/club/club.module').then(
          (m)=>m.ClubModule
        ),
    },

    {
      path:'auth',
      loadChildren:()=>import('./modules/auth/auth.module').then(
        (m)=>m.AuthModule
      ),
    },

   {
      path:"",
        loadChildren:()=>import('./modules/core/core.module').then(
          (m)=>m.CoreModule
        ),
    },

    {
      path:"profile",
        loadChildren:()=>import('./modules/user/user.module').then(
          (m)=>m.UserModule
        ),
    },

      
];
