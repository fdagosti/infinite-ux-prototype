import { Injectable } from '@angular/core';
import {IVPService} from "./ivp.service";
import {Observable} from "rxjs";
import {TwitchService} from "./twitch.service";

@Injectable()
export class HomeService {

  private leafCats = [];

  private channel = {
    id: "live",
    name: "Live Channels",
  }

  private twitchRow = {
    id: "twitch",
    name: "Twitch Top Games",
    portrait: true
  }

  constructor(private ivp:IVPService, private twitch:TwitchService) { }

  public getLolomoRows() {
    this.leafCats = [];
    return this.getCategories()
      .switchMap(v=>this.getCategories(v[0]))
      .do(()=>this.leafCats[2].portrait = true)
      .map((v)=>[this.channel].concat(this.leafCats))
      .map((v:any)=> {
        if (this.twitch.isTwitchConnected()){
          return [this.twitchRow].concat(v)
        }else {
          return v;
        }
      })
  }

  private getCategories(zeCats?){
    return this.ivp.getCategories(zeCats ? zeCats.id : "")
      .map((cats: any) => cats.categories)
      .do(cats => this.leafCats = this.leafCats.concat(cats.filter(v => v.leaf)))
      .map(cats => cats.filter(v => !v.leaf))
      ;
  }



}
