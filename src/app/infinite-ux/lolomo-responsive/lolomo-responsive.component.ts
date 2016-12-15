import {Component, OnInit, Input} from "@angular/core";
import {IVPService} from "../../ivp.service";

@Component({
  selector: 'iux-lolomo-responsive',
  templateUrl: 'lolomo-responsive.component.html',
  styleUrls: ['lolomo-responsive.component.css']
})
export class LolomoResponsiveComponent implements OnInit {

  @Input() category;
  @Input() portrait=false;

  showChevron = false;
  multiPage = false;

  private rowNb = 4;

  constructor() { }

  ngOnInit() {

  }


  onResize(event){

    console.log("RESIZE ",event);

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
