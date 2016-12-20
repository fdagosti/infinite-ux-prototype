import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {IVPService} from "../../ivp.service";

@Component({
  selector: 'iux-lolomo-responsive',
  templateUrl: 'lolomo-responsive.component.html',
  styleUrls: ['lolomo-responsive.component.css'],
})
export class LolomoResponsiveComponent implements OnInit {

  @Input() category;
  @Input() portrait=false;
  @Input() closeJawbone=false;

  private jawboneState;
  @Output("jawboneOpen") private jawboneEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();


  showChevron = false;
  multiPage = false;

  private rowNb = 4;


  constructor() { }

  jawboneOpen(b){
    this.jawboneEmitter.emit(b);
    this.jawboneState = b;
  }

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
