import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {IVPService} from "../../ivp.service";

@Component({
  selector: 'iux-lolomo-row',
  templateUrl: 'lolomo-row.component.html',
  styleUrls: ['lolomo-row.component.css'],
})
export class LolomoRowComponent implements OnInit {

  @Input() category;
  @Input() portrait=false;
  @Input() closeJawbone=false;
  @Input() rowIndex;

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
    if (this.category.preventFullContent)
      return "./";
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
