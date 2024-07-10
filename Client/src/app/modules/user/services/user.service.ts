import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiService = inject(ApiService)

  //User ENDPOINTS
getUsers = (url:string):Observable<User[]> =>{
  return this.apiService.get(url,{responseType:'json'});
}

getUserById = (url:string):Observable<User> =>{
  return this.apiService.get(url,{responseType:'json'});
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
