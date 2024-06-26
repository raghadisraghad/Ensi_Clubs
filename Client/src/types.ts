import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  token:string 
  img: string;
  class: string;
  admin: boolean;
}

export interface Comment {
  id?:string
  user: User|String;
  body: string;
  date: Date;
}

export interface Event {
  id?:string
  name: string;
  description:string
  date: Date;
  ticket: boolean;
  price: number;
}

export interface Member {
  id?:string
  user: User|string;
  role: string;
  absence: number;
}

export interface Club {
  id: string;
  name: string;
  bio:string;
  logo:string;
  slogan:string;
  rate: number;
  members: Member[];
  comments: Comment[];
  events: Event[];
}

export interface Clubs {
  clubs: Club[];
  /*
  total: number;
  page: number;
  perPage: number;
  totalPages: number; */
}

export interface PaginationParam {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
      page: number;
      perPage: number;
  }



  export interface Options {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    context?: HttpContext;
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?:
      | {
          includeHeaders?: string[];
        }
      | boolean;
  }