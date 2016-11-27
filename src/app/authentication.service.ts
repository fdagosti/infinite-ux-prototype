import "rxjs/Rx";
import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Response, URLSearchParams} from "@angular/http";

@Injectable()
export class AuthenticationService {

  private loginUrl = "https://cloudsso.cisco.com/as/token.oauth2";

  private LOCAL_STORAGE:string = "InfiniteUX-proto-token-v1";


  constructor(private http: Http) {
  }

  private login(){

    let params = new URLSearchParams();
    params.set('client_id', "387008adab87419ca071be1f1ae86338");
    params.set('client_secret', "0f85f3fb8cc94a01B46DB972B6236B61");
    params.set('grant_type', "client_credentials");

    return this.http.post(this.loginUrl, params)
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

}
