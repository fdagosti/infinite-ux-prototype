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
  @Input() category;
  @Input() vertical = false;

  constructor(public ctap:CtapService, ) {

  }

  ngOnInit(){
    this.getCategories();
  }

  private getCategories(){
    this.ctap.getCategories(this.category?this.category.id:"")
      .do(cats => console.log("CATEGORIES ",cats))
      .subscribe(
        cats => this.categories = cats,
        error => this.errorMessage = <any>error
      );
  }

}
