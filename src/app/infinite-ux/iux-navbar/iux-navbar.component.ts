import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../authentication.service";

@Component({
  selector: 'iux-navbar',
  templateUrl: './iux-navbar.component.html',
  styleUrls: ['./iux-navbar.component.css']
})
export class IUXNavbarComponent implements OnInit {
  private currentlyLoggedIn;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.loginStateChanged$.subscribe(login => this.currentlyLoggedIn = this.auth.isLoggedIn());
    this.currentlyLoggedIn = this.auth.isLoggedIn();
  }


}
