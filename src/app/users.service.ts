import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class UsersService {


  private users = [
    {name: "francois",
    image: "françois.png"},
    {name: "peter",
      image: "peter.png"}
  ];

  constructor() { }

  getUsers(){
    return Observable.of(this.users);
  }

}
