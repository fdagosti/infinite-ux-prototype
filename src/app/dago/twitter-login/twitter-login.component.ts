import { Component, OnInit } from '@angular/core';
import {TwitterService} from "../../twitter.service";

@Component({
  selector: 'iux-twitter-login',
  templateUrl: 'twitter-login.component.html',
  styleUrls: ['twitter-login.component.css']
})
export class TwitterLoginComponent implements OnInit {
  private token;
  private errorMessage;
  private isLoggedIn;
  private currentUser;

  constructor(private twitter: TwitterService) { }

  ngOnInit(){
    this.updateUser();
    this.twitter.loginStateChanged$.subscribe(login => this.updateUser());
  }

  private updateUser(){
    this.isLoggedIn = this.twitter.isLoggedIn();
    this.currentUser= this.twitter.currentUser();
  }

  private logout(){
    this.twitter.logout();
    this.updateUser();
  }

  private login(credentials){
    this.twitter.login(credentials)
      .do(token => console.log("TOKEN ",token))
      .subscribe(
        token => {
          this.token = token;
          this.updateUser();
        },
        error => this.errorMessage = <any>error
      );
  }

}


