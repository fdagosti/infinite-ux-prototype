import {Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs";

export class IvpAuth{

  constructor(private http:Http){}

  private LOCAL_STORAGE:string = "InfiniteUX-proto-token-v1";

  public getHeadersWithAuth(){
    return this.getAccessToken()
      .map((token) => new Headers({"Authorization": "Bearer "+token}))

  }

  private saveToken(token){
    token.exp = Date.now()/1000 + token.expires_in;
    window.localStorage[this.LOCAL_STORAGE] = JSON.stringify(token);
    return token || { };
  }

  private _isLoggedIn = function(){
    var token = this.getToken();
    if (token) {
      return token.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private getAccessToken = function(){
    if (!this._isLoggedIn()){
      return this.login();
    }else{
      return Observable.of(this.getToken().access_token);
    }
  }

  private login(){
    return this.http.post("/api/login_ivp", null)
      .map(res => this.saveToken(res.json()).access_token)
      .catch(this.handleError);
  }

  private getToken(){
    let t = window.localStorage[this.LOCAL_STORAGE];
    if(t){
      return JSON.parse(t);
    }
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
