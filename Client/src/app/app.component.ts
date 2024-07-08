import { Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/core/header/header.component';
import { FooterComponent } from './modules/core/footer/footer.component';
import { Club } from '../types';
import { SharedService } from './modules/shared/services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


}
