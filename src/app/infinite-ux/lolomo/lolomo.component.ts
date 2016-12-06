import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-lolomo',
  templateUrl: 'lolomo.component.html',
  styleUrls: ['lolomo.component.css']
})
export class LolomoComponent implements OnInit {

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
