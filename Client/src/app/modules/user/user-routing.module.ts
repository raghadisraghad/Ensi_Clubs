import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ClubProfileComponent } from './club-profile/club-profile.component';

const routes: Routes = [
  {
    path:"user",
    component:ProfileComponent
  },

  {
    path:"club",
    component:ClubProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
