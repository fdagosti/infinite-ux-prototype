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
    this.loginStateChanged$ = new EventEmitter<string>();
  }

  login(credentials){

    let params = new URLSearchParams();
    params.set('client_id', "zbn2ZXUkIXBJBnRccbNVrUSxd");
    params.set('client_secret', "X2koMxUPzRIMagCHkPaU4Fp4W1B3oJEDyLFQ1aFbhyD7TJDado");
    params.set('grant_type', "client_credentials");

    return this.http.post(this.LOGINURL, params)
      .do(res => console.log("res ",res))
      .map(res => this.saveToken(res))
      .catch(this.handleError);
  }

  logout(){
    window.localStorage.removeItem(this.LOCAL_STORAGE);
    this.loginStateChanged$.emit("logout");
  }

  isLoggedIn = function(){
    var token = this.getToken();
    if (token) {
      return !token.exp || (token.exp > Date.now() / 1000);
    } else {
      return false;
    }
  }

  currentUser() {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      return {
        client_id: token.client_id,
      };
    }
  }

  getAccessToken = function(){
    let t = this.getToken();

    return t?this.getToken().access_token:"";
  }


  private getToken(){
    let t = window.localStorage[this.LOCAL_STORAGE];
    if(t){
      return JSON.parse(t);
    }
  }

  private saveToken(res: Response){
    let token = res.json();
    if (token.expires_in) {
      token.exp = Date.now() / 1000 + token.expires_in;
    }
    window.localStorage[this.LOCAL_STORAGE] = JSON.stringify(token);
    this.loginStateChanged$.emit("login");
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

  private getHeadersWithAuth(){
    return new Headers({
      "Authorization":"Bearer "+this.getAccessToken()
    });
  }

  getContent(search, offset){
    return this.search(`${search} filter:images`);
  }

  fromTwitterToRowComp(twitterData){

    let res = twitterData.statuses
      .filter(status=>status.entities.media)
      .map((status)=> {
      let medias = new Array(6).fill(1).map(()=>({url: status.entities.media[0].media_url}));
      return {"content": {
        "title": status.text,
        "media": medias
      }}
    });
    return {content: res};

  }

  search(query) {

    let params = new URLSearchParams();
    params.set('q', query);
    params.set('result_type', "recent");

    let options = new RequestOptions({
      headers: this.getHeadersWithAuth(),
      search: params

    });

    return this.http.get(this.PROXY+this.TWITTERURL+"search/tweets.json", options)
      .map((res:Response) => res.json())
      .map(this.fromTwitterToRowComp)
  }

}
