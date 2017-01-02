import { Injectable } from '@angular/core';
import {IVPService} from "../ivp/ivp.service";
import {Observable} from "rxjs";
import {TwitchService} from "../twitch/twitch.service";

@Injectable()
export class HomeService {

  private leafCats = [];

  private channel = {
    id: "live",
    name: "Live Channels",
    getObservable: offset=> this.ivp.getChannels(offset, "20")
  }


  private twitchRow = {
    id: "twitch",
    name: "Twitch Top Games",
    portrait: true,
    getObservable: offset=>this.twitch.getTopGames(offset, "20")
  }

  constructor(private ivp:IVPService, private twitch:TwitchService) { }

  public getLolomoRows() {
    this.leafCats = [];
      return this.getCategories()
      .map((v)=>[this.channel].concat(this.leafCats))
      .map((v:any)=> {
        if (this.twitch.isTwitchConnected()){
          return [this.twitchRow].concat(v)
        }else {
          return v;
        }
      })
  }

  private getCategoryObserable(cat){
    return offset=> this.ivp.getContent(cat, offset, "20");
  }

  private getCategories(){
    return this._getOneLevelOfCategories()
      .switchMap(v=>this._getOneLevelOfCategories(v[0]))
      .do(()=>this.leafCats[2].portrait = true)
      .do(()=>this.leafCats.forEach(c=>c.getObservable = this.getCategoryObserable(c.id)));
  }

  private _getOneLevelOfCategories(zeCats?){
    return this.ivp.getCategories(zeCats ? zeCats.id : "")
      .map((cats: any) => cats.categories)
      .do(cats => this.leafCats = this.leafCats.concat(cats.filter(v => v.leaf)))
      .map(cats => cats.filter(v => !v.leaf))
      ;
  }



}
