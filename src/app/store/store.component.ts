import {Component, OnInit, Input} from "@angular/core";
import {IVPService} from "../ivp.service";
import {Subscription} from "rxjs";
import {DebugService} from "../dago/debug.service";
import {debug} from "util";

@Component({
  selector: 'iux-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  private errorMessage;
  private leafCats=[];
  private busy:Subscription;
  private newLolomo=false;
  @Input() category;
  @Input() portrait = false;
  @Input() showLoading= true;
  private jawboneOpened: any = [];
  private nonLeafCats = [];

  constructor(public ctap:IVPService, public debug:DebugService) {

  }

  jawboneOpen(b, i){
    this.jawboneOpened.fill(false);
    this.jawboneOpened[i] = b;

  }

  ngOnInit(){
    this.getCategories();
    this.newLolomo = this.debug.isNewLolomoUsed();
  }

  private getCategories(zeCats?){
    this.busy = this.ctap.getCategories(zeCats?zeCats.id:"")
      .map((cats:any )=> ({
          count: cats.count,
          categories: cats.categories.slice(0, 6)
        }))
      .map((result:any)=> result.categories)
      .do(v=>this.jawboneOpened = v.map(()=>false))
      .do(cats => this.leafCats = this.leafCats.concat(cats.filter(v=>v.leaf)))
      .do(cats => this.nonLeafCats = cats.filter(v=>!v.leaf))
      .subscribe(
        cats => console.log("NEXT cats ",this.leafCats),
        error => this.errorMessage = <any>error,
        ()=> this.nonLeafCats.forEach(c=> {
          this.getCategories(c)
        })
      );
  }

}
