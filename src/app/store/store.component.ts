import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../ctap.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'iux-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  private errorMessage;
  private categories;
  private busy:Subscription;
  @Input() category;
  @Input() portrait = false;

  constructor(public ctap:CtapService, ) {

  }

  ngOnInit(){
    this.getCategories();
  }

  private getCategories(){
    this.busy = this.ctap.getCategories(this.category?this.category.id:"")
      .map((result:any)=> result.categories)
      .subscribe(
        cats => this.categories = cats,
        error => this.errorMessage = <any>error
      );
  }

}
