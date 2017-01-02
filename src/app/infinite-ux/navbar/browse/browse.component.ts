import { Component, OnInit } from '@angular/core';
import {IVPService} from "../../../ivp/ivp.service";

@Component({
  selector: 'iux-browse',
  templateUrl: 'browse.component.html',
  styleUrls: ['browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private ivp: IVPService) { }

  private categories=[];
  private busy;


  ngOnInit() {
    this.fetchCategories();
  }

  private fetchCategories(catId=""){
    this.busy = this.ivp.getCategories(catId)
      .subscribe(
        (cats:any )=> {
          cats.categories.forEach(item => {
            if (item.leaf){ this.categories.push(item);}
           else {this.fetchCategories(item.id)}
          })
        },
        error => console.log("Error = ",error)

      )
  }

}
