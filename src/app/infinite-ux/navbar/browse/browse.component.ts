import {Component, OnInit} from "@angular/core";
import {BrowseService} from "./browse.service";

@Component({
  selector: 'iux-browse',
  templateUrl: 'browse.component.html',
  styleUrls: ['browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private browse: BrowseService) { }

  private categories=[];
  private busy;


  ngOnInit() {
    this.fetchCategories();
  }

  private fetchCategories(){
    this.busy = this.browse.getCategories()
      .subscribe(
        (cats:any )=> {
          this.categories = cats;
        },
        error => console.log("Error = ",error)

      )
  }

}
