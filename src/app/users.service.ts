import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class UsersService {


  private users = [
    {name: "francois",
    image: "avatar.png"},
    {name: "peter",
      image: "avatar.png"}
  ];

  constructor() { }

  getUsers(){
    return Observable.of(this.users);
  }

}
