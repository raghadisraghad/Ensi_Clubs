import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';

const routes: Routes = [
  {
    path:"test",
    component:ClubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
