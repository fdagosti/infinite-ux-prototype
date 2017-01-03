import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../infinite-ux/player/users.service";

@Component({
  selector: 'iux-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.css']
})
export class ListProfilesComponent implements OnInit {

  private users;

  constructor(private usersSource:UsersService) { }

  ngOnInit() {
    this.usersSource.getUsers()
      .do(c=>console.log("Users = ",c))
      .subscribe(content => this.users=content);
  }

}
