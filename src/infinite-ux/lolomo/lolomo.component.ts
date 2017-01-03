import {Component, OnInit, Input} from "@angular/core";
import {Subscription} from "rxjs";
import {JawboneService} from "../content-row-responsive/jawbone.service";
import {LolomoService} from "./lolomo.service";

@Component({
  selector: 'iux-lolomo',
  templateUrl: 'lolomo.component.html',
  styleUrls: ['lolomo.component.css'],
  providers: [
    JawboneService
  ]
})
export class LolomoComponent implements OnInit {

  private allRows;
  private projectedRows = [];
  private busy: Subscription;
  @Input() portrait = false;
  private jawboneOpened: any = [];

  constructor(private lolomoService:LolomoService, private jawbone:JawboneService) {
  }

  jawboneOpen(b, i) {
    this.jawboneOpened.fill(false);
    this.jawboneOpened[i] = b;
  }

  closeJawbone(i){
    this.jawboneOpened[i]=false
    this.jawbone.setJawboneStatus(i, false);
  }

  ngOnInit() {
    this.getRows();
  }

  private currentLeafWin = 6;

  onScroll(){
    if (this.projectedRows.length < this.allRows.length) {
      this.currentLeafWin += 2;
      this.projectedRows = this.allRows.slice(0, this.currentLeafWin);
    }
  }

  private getRows() {

    this.busy = this.lolomoService.getLolomoRows()
      .do(v=>this.allRows=v)
      .do(rows => this.jawbone.setNumberOfRows(this.allRows.length))
      .do(v => this.jawboneOpened = v.map(() => false))
      .do(()=>this.projectedRows = this.allRows.slice(0,this.currentLeafWin))
      .subscribe(
        (v)=>{},
        (e)=>console.log("error",e),
        ()=>{}
      );



  }

}
