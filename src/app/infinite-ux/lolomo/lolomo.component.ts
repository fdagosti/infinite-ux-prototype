import {Component, OnInit, Input} from "@angular/core";
import {Subscription} from "rxjs";
import {IVPService} from "../../ivp.service";
import {DebugService} from "../../dago/debug.service";
import {JawboneService} from "../jawbone.service";

@Component({
  selector: 'iux-lolomo',
  templateUrl: 'lolomo.component.html',
  styleUrls: ['lolomo.component.css'],
  providers: [
    JawboneService
  ]
})
export class LolomoComponent implements OnInit {

  private errorMessage;
  private leafCats = [];
  private projectedCats = [];
  private busy: Subscription;
  private newLolomo = false;
  @Input() category;
  @Input() portrait = false;
  @Input() showLoading = true;
  private jawboneOpened: any = [];
  private nonLeafCats = [];

  constructor(public ctap: IVPService, public debug: DebugService, private jawbone:JawboneService) {

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
    this.getCategories();
    this.newLolomo = this.debug.isNewLolomoUsed();
  }

  private currentLeafWin = 6;

  onScroll(){
    if (this.projectedCats.length < this.leafCats.length) {
      this.currentLeafWin += 2;
      this.projectedCats = this.leafCats.slice(0, this.currentLeafWin);
    }
  }

  private getCategories(zeCats?) {
    this.busy = this.ctap.getCategories(zeCats ? zeCats.id : "")
      .map((cats: any) => cats.categories)
      .do(cats => this.leafCats = this.leafCats.concat(cats.filter(v => v.leaf)))
      .do(cats => this.jawbone.setNumberOfRows(this.leafCats.length))
      .do(cats => this.nonLeafCats = cats.filter(v => !v.leaf))
      .do(v => this.jawboneOpened = v.map(() => false))
      .subscribe(
        ()=>this.projectedCats = this.leafCats.slice(0,this.currentLeafWin),
        error => this.errorMessage = <any>error,
        () => this.nonLeafCats.forEach(c => this.getCategories(c))
      );
  }

}
