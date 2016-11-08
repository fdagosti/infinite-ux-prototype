import { Component, OnInit } from '@angular/core';
import {CtapService} from "../ctap.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'iux-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  private errorMessage;
  private categories;
  private currentlyLoggedIn;

  constructor(public ctap:CtapService, private auth:AuthenticationService) {
    this.auth.loginStateChanged$.subscribe(login => this.updateLogStatus());
    this.updateLogStatus();
  }

  updateLogStatus(){
    this.currentlyLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit(){
    this.ctap.getCategories()
      .subscribe(
        cats => this.categories = cats,
        error => this.errorMessage = <any>error
      );

  }

}
