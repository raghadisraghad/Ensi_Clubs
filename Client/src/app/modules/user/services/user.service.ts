import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../../../types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
http = inject(HttpClient)
  apiService = inject(ApiService)

  //User ENDPOINTS
getUsers = (url:string):Observable<User[]> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getUserById = (url:string):Observable<User> =>{
  return this.apiService.get(url,{responseType:'json'});
}

private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

getById(id: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/${id}`, { headers: this.getHeaders() });
}

addUser = (url: string, body: User): Observable<User> => {
  return this.apiService.post(url, body, {});
};

editUser = (url: string, body: User): Observable<User> => {
  return this.apiService.put(url, body, {});
};

deleteUser = (url:string):Observable<User> => {
  return this.apiService.delete(url,{})
}

verifyByToken(){

}

updateProfile(url: string,body:any):Observable<User>{
  return this.apiService.post(url,body,{})
}

}
