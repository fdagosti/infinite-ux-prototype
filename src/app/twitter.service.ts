import {Injectable, EventEmitter} from '@angular/core';
import {Http, URLSearchParams, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class TwitterService {

  private LOGINURL = "https://api.twitter.com/oauth2/token";
  private TWITTERURL = "https://api.twitter.com/1.1/";
  private PROXY = "https://cisco-itk-proxy.herokuapp.com/";

  private LOCAL_STORAGE:string = "InfiniteUX-twitter-token-v1";

  public loginStateChanged$: EventEmitter<string>;

  constructor(private http: Http) {
  }

  private login(){
    return this.http.post("/api/login_twitter", null)
      .map(res => this.saveToken(res).access_token)
      .catch(this.handleError);
  }



  private _isLoggedIn = function(){
    var token = this.getToken();
    if (token) {
      return token.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getAccessToken = function(){
    if (!this._isLoggedIn()){
      return this.login();
    }else{
      return Observable.of(this.getToken().access_token);
    }
  }


  private getToken(){
    let t = window.localStorage[this.LOCAL_STORAGE];
    if(t){
      return JSON.parse(t);
    }
  }

  private saveToken(res: Response){
    let token = res.json();
    token.exp = Date.now()/1000 + token.expires_in;
    window.localStorage[this.LOCAL_STORAGE] = JSON.stringify(token);
    return token || { };
  }

  private handleError (error: Response | any) {
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

  private getHttpCall(params, urls){
    return this.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      })).switchMap((options) => this.http.get(this.PROXY+this.TWITTERURL+urls, options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  private getHeadersWithAuth(){
    return this.getAccessToken()
      .map((token) => new Headers({"Authorization": "Bearer "+token}))

  }


getContent(search, offset){
    return this.search(`${search} filter:images`);
  }

  fromTwitterToRowComp(twitterData){

    let res = twitterData.statuses
      .filter(status=>status.entities.media)
      .map((status)=> {
      let medias = new Array(6).fill(1).map(()=>({url: status.entities.media[0].media_url}));
      return {
        "content": {
        "title": "",
        "media": medias,
          "synopsis": {
            "shortSynopsis" : status.text
          }
        },
        _links:{

        }
      }
    });
    return {content: res};

  }

  search(query) {

    let params = new URLSearchParams();
    params.set('q', query);
    params.set('result_type', "recent");

    return this.getHttpCall(params, "search/tweets.json")
      .map(this.fromTwitterToRowComp);
  }

}
