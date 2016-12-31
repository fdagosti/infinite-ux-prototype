import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class TwitchService {

  private LOCAL_STORAGE:string = "InfiniteUX-twitch";

  private oAuthUrl;

  constructor(private http:Http) {
    http.get("/api/login_twitch",null)

      .do(v=>console.log("v",v.json()))
      .map(res=>res.json())
      .subscribe(
      url=>this.oAuthUrl=url,
      (e)=>console.log("error",e)
    )
  }

  public connectAccount(){
    window.location.href = this.oAuthUrl;
  }

  public disconnectAccount(){
    window.localStorage[this.LOCAL_STORAGE] = null;
  }

  public getHeadersWithAuth(){
    return this.getAccessToken()
      .map((token) => new Headers({"Authorization": "OAuth "+token}))

  }

  private getAccessToken = function(){
    if (!this._isLoggedIn()){
      return this.login();
    }else{
      return Observable.of(this.getToken().access_token);
    }
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
