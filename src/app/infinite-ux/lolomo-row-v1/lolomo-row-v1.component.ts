import {Component, OnInit, Input} from "@angular/core";
import {IVPService} from "../../ivp.service";

@Component({
  selector: 'iux-lolomo-row-v1',
  templateUrl: 'lolomo-row-v1.component.html',
  styleUrls: ['lolomo-row-v1.component.css']
})
export class LolomoRowV1Component implements OnInit {

  @Input() category;
  @Input() portrait=false;

  showChevron = false;
  multiPage = false;

  constructor() { }

  ngOnInit() {

  }

  getFullContentUrl(){
    return "/full/"+this.category.id;
  }

  hasMultiPage(multiPage){
    this.multiPage = multiPage;
  }

  mouseOver(){
    this.showChevron = true;
  }

  mouseOut(){
    this.showChevron = false;
  }

}
