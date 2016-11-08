import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'iux-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private errorMessage;
  private token:string;
  private currentUser;
  private isLoggedIn;

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
    this.updateUser();
    this.auth.loginStateChanged$.subscribe(login => this.updateUser());
  }

  private updateUser(){
    this.isLoggedIn = this.auth.isLoggedIn();
    this.currentUser = this.auth.currentUser();
  }

  private logout(){
    this.auth.logout();
    this.updateUser();
  }

  private submit(credentials){
    this.auth.login(credentials)
      .subscribe(
        token => {
          this.token = token;
          this.updateUser();
        },
        error => this.errorMessage = <any>error
      );
  }

  private submitWithDefaultCredentials(){
    this.submit({client_id:"auto",client_secret:"auto"});
  }

}
