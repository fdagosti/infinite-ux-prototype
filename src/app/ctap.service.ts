import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {AuthenticationService} from "./authentication.service";

export class Category{
  constructor(public id:string="",public name="",public _links=""){

  }

}

@Injectable()
export class CtapService {

  private ctapUrl = "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_2/";

  constructor(private http: Http, private auth:AuthenticationService) { }

  getCategories(categoryId): Observable<any[]>{
    if (!categoryId){categoryId="";}

    return this.getHttpCall(null, "categories/"+categoryId);

  }

  getContent(categoryId, offset?, limit="6"){

    let params = new URLSearchParams();
    params.set('categoryId', categoryId); // the user's search value
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    return this.getHttpCall(params, "agg/content/");
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

    return this.getHttpCall(params, "devices/me/playsessions");
  }

  private getHttpCall(params, urls){
    return this.getHeadersWithAuth()
      .map((headers) => new RequestOptions({
        headers: headers,
        search: params
      })).switchMap((options) => this.http.get(this.ctapUrl+urls, options))
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  private getHeadersWithAuth(){
    return this.auth.getAccessToken()
      .map((token) => new Headers({"Authorization": "Bearer "+token}))

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
