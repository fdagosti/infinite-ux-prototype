
import { Injectable } from '@angular/core';
import {Params} from "@angular/router";
import {Observable} from "rxjs";
import {IVPService} from "../ivp.service";
import {TwitchService} from "../twitch/twitch.service";

@Injectable()
export class FlatDataService {

  constructor(private ctap: IVPService,private twitch: TwitchService) { }

  public getFullContentData(params:Params, offset){
    if (params["contentName"]){
      return this.ctap.getContentFromSearchedTerm(params['contentName'], 0, "200")
        .map(result=>({
          id: params['contentName'],
          title: params['contentName'],
          content: result,
          portrait: false
        }));
    }else if (params['categoryId'] && params['categoryId']=="live"){
      return this.ctap.getChannels( 0, "200")
        .map(result=>({
          id: params["categoryId"],
          title: "Live",
          content: result,
          portrait: false
        }));

    }else if (params['categoryId'] && params['categoryId']=="twitch"){
      return this.twitch.getTopGames(offset, "30")
        .map(result=>({
          id: params["categoryId"],
          title: "Twitch Top Games",
          content: result,
          portrait: true
        }))
    }else if (params['categoryId']) {
      return Observable.forkJoin(
        this.ctap.getContent(params['categoryId'], offset, "30"),
        this.ctap.getCategories(params['categoryId']))
        .take(1)
        .map(a=>({
          id: params["categoryId"],
          title: a[1].name,
          content: a[0],
          portrait: true
        }))
    }
    return null;
  }

  // TODO to merge with the previous method when needed
  public getScrollUpdateData(id, offset){
    if (id === "twitch"){
      return this.twitch.getTopGames(offset, "30");
    }else{
      return this.ctap.getContent(id, offset, "30");
    }
  }


}
