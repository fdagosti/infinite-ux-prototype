import { Injectable } from '@angular/core';
import {IVPService} from "./ivp/ivp.service";
import {Observable} from "rxjs";

@Injectable()
export class GlobalAppService {
  private leafCats;

  constructor(private ivp: IVPService) {
    console.log("creating GlobalAppService")
  }

  public getCategories(){
    this.leafCats = [];
    return this._getOneLevelOfCategories()
      .switchMap(v=>this._getOneLevelOfCategories(v[0]))
      .do(()=>this.leafCats[2].portrait = true)
      .do(()=>this.leafCats.forEach(c=>c.getObservable = offset=> this.ivp.getContent(c.id, offset, "20")))
      .map(()=>this.leafCats);
  }

  private _getOneLevelOfCategories(zeCats?){
    return this.ivp.getCategories(zeCats ? zeCats.id : "")
      .map((cats: any) => cats.categories)
      .do(cats => this.leafCats = this.leafCats.concat(cats.filter(v => v.leaf)))
      .map(cats => cats.filter(v => !v.leaf));
  }

  public getSuggestions(term):Observable<any>{return this.ivp.getSuggestions(term);}


  getPlayUrl(instanceId):Observable<any> {
    return this.ivp.getPlaySession(instanceId)
      .map((content:any) => content._links.playUrl.href);
  }
}
