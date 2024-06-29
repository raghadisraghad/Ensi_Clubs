import { EventEmitter, Injectable } from '@angular/core';
import { Club } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  clubSelected: EventEmitter<Club> = new EventEmitter<Club>();
  appSelectedClub: EventEmitter<Club> = new EventEmitter<Club>();

  emitClubSelected(club: Club) {
    this.clubSelected.emit(club);
  }

  emitAppSelectedClub(club: Club) {
    this.appSelectedClub.emit(club);
  }
}
