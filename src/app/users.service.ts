import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class UsersService {


  private users = [
    {
      name: "francois",
      image: "françois.png",
      language:"english",
      restricted:"false"
    },
    {
      name: "peter",
      image: "peter.png",
      language:"english",
      restricted:"false"
    }
  ];

  constructor() { }

  getUsers(){
    return Observable.of(this.users);
  }

}
