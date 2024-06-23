import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options, User,Club,Event,Comment,Member, } from '../../../../types';


//dyali
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
  
    post<T>(url: string,body:User|Club|Event|Comment|Member, options: Options): Observable<T> {
      return this.httpClient.post<T>(url,body, options) as Observable<T>;
    }
  
    put<T>(url: string,body:User|Club|Event|Comment|Member, options: Options): Observable<T> {
      return this.httpClient.put<T>(url,body, options) as Observable<T>;
    }
  
    delete<T>(url: string, options: Options): Observable<T> {
      return this.httpClient.delete<T>(url, options) as Observable<T>;
    }
  
}
