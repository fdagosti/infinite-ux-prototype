import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-content-list-sm',
  templateUrl: 'iux-content-list-sm.component.html',
  styleUrls: ['iux-content-list-sm.component.css']
})
export class IUXContentListSmComponent implements OnInit {

  @Input() category;

  showChevron = false;

  constructor() { }

  ngOnInit() {

  }

  getFullContentUrl(){
    return "full/"+this.category.id;
  }

  mouseOver(){
    this.showChevron = true;
  }

  mouseOut(){
    this.showChevron = false;
  }

}
