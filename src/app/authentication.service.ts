import 'rxjs/Rx';
import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";

@Injectable()
export class AuthenticationService {

  private loginUrl = "https://cisco-itk-proxy.herokuapp.com/"+"http://infinite-epg.herokuapp.com/api/login";

  private LOCAL_STORAGE:string = "InfiniteUX-proto-token-v1";

  public loginStateChanged$: EventEmitter<string>;

  constructor(private http: Http) {
    this.loginStateChanged$ = new EventEmitter<string>();
  }

  login(credentials){
    return this.http.post(this.loginUrl, credentials)
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
      return token.exp > Date.now() / 1000;
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
    token.exp = Date.now()/1000 + token.expires_in;
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

}
