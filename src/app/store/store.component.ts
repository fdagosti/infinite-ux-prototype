import { Component, OnInit, Input } from '@angular/core';
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
  @Input() category;

  constructor(public ctap:CtapService, private auth:AuthenticationService) {
    this.auth.loginStateChanged$.subscribe(login => this.updateLogStatus());

  }

  updateLogStatus(){
    this.currentlyLoggedIn = this.auth.isLoggedIn();
    if (this.currentlyLoggedIn){
      this.getCategories();
    }
  }

  ngOnInit(){
    this.updateLogStatus();
  }

  private getCategories(){
    this.ctap.getCategories(this.category?this.category.id:"")
      .subscribe(
        cats => this.categories = cats,
        error => this.errorMessage = <any>error
      );
  }

}
