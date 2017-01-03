import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class TwitchService {

  private LOCAL_STORAGE:string = "InfiniteUX-twitch";

  private TWITCH = "https://api.twitch.tv/kraken/";

  constructor(private http:Http) {
  }


  public getTopGames(offset?,limit?){
    let params = new URLSearchParams();
    if (limit) params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value
    return this.convertTwitchDataToLolomo(this.getHttpCall(params, "games/top"));
  }

  private getHttpCall(params, urls){
    return this.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      }))
      .switchMap((options) => this.http.get(this.TWITCH+urls, options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * This method converts the Data from the IVP cloud into data that is understandable by the Lolomo component
   * @param obs
   * @returns {Observable<R>}
   */
  private convertTwitchDataToLolomo(obs:Observable<any>){
    return obs
      .map(games=>{
        games.total = games._total;
        games.content = games.top;
        games.content.forEach(g=>{

          g.title = g.game.name;
          g._links = g.game._links;
          g.media = Array(6).fill({url: g.game.box.large});
          g.media[2] = {url:g.game.logo.large};
          g.synopsis = {
            longSynopsis:"This game does not have a synopsis",
            shortSynopsis:"This game does not have a synopsis"
          };
          g.genres = [{name:"NO game GENRE"}];
        });
        return games;
      });
  }

  public connectAccount(){
    this.http.get("/api/login_twitch",null)
      .map(res=>res.json())
      .subscribe(
        url=>window.location.href = url,
        (e)=>console.log("error",e)
      )

  }

  public disconnectAccount(){
    window.localStorage[this.LOCAL_STORAGE] = null;
  }

  private getHeadersWithAuth(){
    return this.getAccessToken()
      .map((token) => new Headers({"Authorization": "OAuth "+token}))

  }

  private getAccessToken = function(){
    return Observable.of(this.getToken().access_token);
  }

  public isTwitchConnected = function(){
    return this.getToken();
  }

  private getToken(){
    let t = window.localStorage[this.LOCAL_STORAGE];
    if(t){
      return JSON.parse(t);
    }
  }

  public login(code){
    let params = new URLSearchParams();
    params.set('code', code); // the user's search value

    let options = new RequestOptions({
      search: params
    });

    return this.http.post("/api/login_twitch", null, options)
      .map(res => this.saveToken(res.json()).access_token)
      .catch(this.handleError);
  }

  private saveToken(token){
    window.localStorage[this.LOCAL_STORAGE] = JSON.stringify(token);
    return token || { };
  }

  private handleError (error: Response | any) {
    console.log("ERROR ",error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
