import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {DebugService} from "./dago/debug.service";

export class Category{
  constructor(public id:string="",public name="",public _links=""){

  }

}

@Injectable()
export class IVPService {

  private categoryCache={};

  private ctapUrl = "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_2/";
  private LOCAL_STORAGE:string = "InfiniteUX-proto-token-v1";

  constructor(private http: Http, private debug:DebugService) { }

  getCategories(categoryId =""): Observable<any[]>{
    let cacheKey = categoryId?categoryId:"global";
    if (this.categoryCache[cacheKey]){
      return Observable.of(this.categoryCache[cacheKey])
    }else {
      return this.getHttpCall(null, "categories/" + categoryId)
        .do(cats => this.categoryCache[cacheKey] = cats);
    }

  }

  private getCtapUrl(){
    if (this.debug.isProxyEnabled()){
      return this.debug.getProxyUrl()+this.ctapUrl;
    }else{
      return this.ctapUrl;
    }
  }

  getContentFromSearchedTerm(term, offset?, limit="6"){
    let params = new URLSearchParams();
    params.set('q', term); // the user's search value
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    return this.normalizeContent(this.getHttpCall(params, "agg/content/"));

  }

  normalizeContent(obs:Observable<any>){
    return obs
      // .do(content =>console.log("content before = ",content))
      .map((content:any) => {
        content.content.forEach(item => {
          if (item.content) {
            delete item.content._links;
            return Object.assign(item, item.content);
          }
          return item;
        });
        return content;
      })
      // .do(content =>console.log("content after = ",content));
  }

  getContent(categoryId, offset?, limit="6",){
    let params = new URLSearchParams();
    params.set('categoryId', categoryId); // the user's search value
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    return this.normalizeContent(this.getHttpCall(params, "agg/content/"));
  }

  getSuggestions(keyword){
    if (keyword == ""){
      return Observable.of([]);
    }

    let params = new URLSearchParams();
    params.set('q', keyword); // the user's search value
    params.set('limit', "10"); // the user's search value

    return this.getHttpCall(params, "keywords/suggest/")
      .map(json => json.suggestions);
  }

  getPlaySession(instanceId){

    let params = new URLSearchParams();
    params.set("instanceId", instanceId);

    return this.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      }))
      .switchMap((options) => this.http.post(this.getCtapUrl()+"devices/me/playsessions", null,options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  getSettings(){
    return this.getHttpCall(undefined, "userProfiles/me/settings");
  }

  private getHttpCall(params, urls){
    return this.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      }))
      .switchMap((options) => this.http.get(this.getCtapUrl()+urls, options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  private getHeadersWithAuth(){
    return this.getAccessToken()
      .map((token) => new Headers({"Authorization": "Bearer "+token}))

  }

  private login(){
    return this.http.post("/api/login_ivp", null)
      .map(res => this.saveToken(res.json()).access_token)
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

  private getAccessToken = function(){
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

  private saveToken(token){
    token.exp = Date.now()/1000 + token.expires_in;
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


  private contentCache = {};
  public setContentCache(categoryId, content, total){
    this.contentCache[categoryId] = {content:content,total:total};
  }
  public getContentCache(categoryId){
    return this.contentCache[categoryId]?this.contentCache[categoryId]:{content:[],total:0};
  }

}
