import { Routes } from '@angular/router';



export const routes: Routes = [
    {
        path:'',
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
    }

      
];
