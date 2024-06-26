import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options, User,Club,Event,Comment,Member, Clubs, } from '../../../../types';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class ClubService {

apiService = inject(ApiService)


//CLUB ENDPOINTS
getClubs = (url:string):Observable<Clubs> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getClubById = (url:string):Observable<Club> =>{
  return this.apiService.get(url,{responseType:'json'});
}

addClub = (url: string, body: Club): Observable<Club> => {
  return this.apiService.post(url, body, {});
};

editClub = (url: string, body: Club): Observable<Club> => {
  return this.apiService.put(url, body, {});
};

deleteClub = (url:string):Observable<Club> => {
  return this.apiService.delete(url,{})
}



//Events Service
getEvents = (url:string):Observable<Event[]> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getEventById = (url:string):Observable<Event> =>{
  return this.apiService.get(url,{responseType:'json'});
}

addEvent = (url: string, body: Event): Observable<Event> => {
  return this.apiService.post(url, body, {});
};

editEvent = (url: string, body: Event): Observable<Event> => {
  return this.apiService.put(url, body, {});
};

deleteEvent = (url:string):Observable<Event> => {
  return this.apiService.delete(url,{})
}


//Members Service
getMembers = (url:string):Observable<Member[]> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getMemberById = (url:string):Observable<Member> =>{
  return this.apiService.get(url,{responseType:'json'});
}

addMember = (url: string, body: Member): Observable<Member> => {
  return this.apiService.post(url, body, {});
};

editMember = (url: string, body: Member): Observable<Member> => {
  return this.apiService.put(url, body, {});
};

deleteMember = (url:string):Observable<Member> => {
  return this.apiService.delete(url,{})
}

//Comment ENDPOINTS

getComments = (url:string):Observable<Comment[]> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getCommentById = (url:string):Observable<Comment> =>{
  return this.apiService.get(url,{responseType:'json'});
}

addComment = (url: string, body: Comment): Observable<Comment> => {
  return this.apiService.post(url, body, {});
};

editComment = (url: string, body: Comment): Observable<Comment> => {
  return this.apiService.put(url, body, {});
};

deleteComment = (url:string):Observable<Comment> => {
  return this.apiService.delete(url,{})
}



}