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
import { ApiService } from '../shared/services/api.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [ClubComponent],
  imports: [ClubRoutingModule,FormsModule, CommonModule,TabViewModule,ActivitiesComponent,ContactComponent,HomeComponent,MembersComponent,HistoryComponent],
  exports:[TabViewModule,FormsModule],
  providers:[ApiService,ConfirmationService],
})
export class ClubModule {}
