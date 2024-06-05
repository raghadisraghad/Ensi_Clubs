export interface User{
    id:string
    name:string
    lastName:string
    email:string
    password:string
    img:string
    class:string
    admin:boolean

}


export interface Comment {
    user:User
    content:string
    date:Date

}

export interface Event  { 
    name:string
    date:Date
    ticket:boolean
    price: number 
}

export interface Member {
    user:User
    role:string
    absence:number
}

export interface Club{
    id:string
    name:string
    rate:number
    members:Member[]
    comments:Comment[]
    events:Event[]

}