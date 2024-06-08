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
  user: User;
  content: string;
  date: Date;
}

export interface Event {
  name: string;
  description:string
  date: Date;
  ticket: boolean;
  price: number;
}

export interface Member {
  user: User;
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
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
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
