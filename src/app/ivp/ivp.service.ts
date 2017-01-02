import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Response, RequestOptions, URLSearchParams} from "@angular/http";
import {DebugService} from "../debug.service";
import {IvpAuth} from "./ivp-auth";

export class Category{
  constructor(public id:string="",public name="",public _links=""){

  }

}

@Injectable()
export class IVPService {

  private categoryCache={};

  private ctapUrl = "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_2/";

  private auth: IvpAuth;

  constructor(private http: Http, private debug:DebugService) {
    this.auth= new IvpAuth(http);
  }

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

    return this.convertContentDataToLolomo(this.getHttpCall(params, "agg/content/"));

  }

  getContent(categoryId, offset?, limit="6",){
    let params = new URLSearchParams();
    params.set('categoryId', categoryId); // the user's search value
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    return this.convertContentDataToLolomo(this.getHttpCall(params, "agg/content/"));
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

    return this.auth.getHeadersWithAuth()
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
    return this.auth.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      }))
      .switchMap((options) => this.http.get(this.getCtapUrl()+urls, options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
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

  public getChannels(offset?, limit="6",){
    let params = new URLSearchParams();
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    return this.convertChannelDataToLolomo(this.getHttpCall(params, "channels"));
  }

  /**
   * Converts data returned by agg/content or search to data understandable by Lolomo component
   * @param obs
   * @returns {Observable<R>}
   */
  private convertContentDataToLolomo(obs:Observable<any>){
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

  /**
   * This method converts the Data from the IVP cloud into data that is understandable by the Lolomo component
   * @param obs
   * @returns {Observable<R>}
   */
  private convertChannelDataToLolomo(obs:Observable<any>){
    return obs
    .map(channels=>{
      channels.content = channels.channels;
      channels.content.forEach(ch=>{
        ch.title = ch.name;
        ch._links = [];
        ch.media = Array(6).fill(ch.media[0]);
        ch.channel = true;
        ch.synopsis = {
          longSynopsis:"This Channel does not have a synopsis",
          shortSynopsis:"This Channel does not have a synopsis"
        };
        ch.genres = [{name:"NO CHANNEL GENRE"}];
      })
      return channels;
    });
  }
}
