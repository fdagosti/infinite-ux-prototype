import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {AuthenticationService} from "./authentication.service";

export class Category{

}

@Injectable()
export class CtapService {

  private ctapUrl = "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_2/";


  constructor(private http: Http, private auth:AuthenticationService) { }

  getCategories(categoryId): Observable<any[]>{
    if (!categoryId){categoryId="";}
    let options = new RequestOptions({ headers: this.getHeadersWithAuth()});

    return this.http.get(this.ctapUrl+"categories/"+categoryId, options)
                    .map((res:Response) => res.json().categories)
                    .catch(this.handleError);
  }

  private getHeadersWithAuth(){
    return new Headers({
      "Authorization":"Bearer "+this.auth.getAccessToken()
    });
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

  getContent(categoryId, offset?, limit="6"){

    let params = new URLSearchParams();
    params.set('categoryId', categoryId); // the user's search value
    params.set('limit', limit); // the user's search value
    if (offset) params.set('offset', offset); // the user's search value

    let options = new RequestOptions({
      headers: this.getHeadersWithAuth(),
      search: params

    });

    return this.http.get(this.ctapUrl+"agg/content/", options)
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  getSuggestions(keyword){
    if (keyword == ""){
      return Observable.of([]);
    }

    let params = new URLSearchParams();
    params.set('q', keyword); // the user's search value
    params.set('limit', "10"); // the user's search value

    let options = new RequestOptions({
      headers: this.getHeadersWithAuth(),
      search: params

    });


    return this.http.get(this.ctapUrl+"keywords/suggest/", options)
      .map((res:Response) =>{
        let body = res.json();
        return body.suggestions || [];
    })
      .catch(this.handleError);
  }

  getPlaySession(instanceId){

    let params = new URLSearchParams();
    params.set("instanceId", instanceId);

    let options = new RequestOptions({
      headers: this.getHeadersWithAuth(),
      search: params
    });

    return this.http.post(this.ctapUrl+"devices/me/playsessions", "", options)
      .map((res:Response) => res.json());
  }


}
