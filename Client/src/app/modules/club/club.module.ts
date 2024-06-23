import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubComponent } from './club/club.component';
import { ClubRoutingModule } from './club-routing.module';

@NgModule({
  declarations: [ClubComponent],
  imports: [ClubRoutingModule, CommonModule],
  exports:[],
  providers:[],
})
export class ClubModule {}
