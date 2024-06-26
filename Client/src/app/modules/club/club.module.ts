import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubComponent } from './club/club.component';
import { ClubRoutingModule } from './club-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ActivitiesComponent } from './activities/activities.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [ClubComponent],
  imports: [ClubRoutingModule, CommonModule,TabViewModule,ActivitiesComponent,ContactComponent,HomeComponent,MembersComponent,HistoryComponent],
  exports:[TabViewModule,],
  providers:[],
})
export class ClubModule {}
