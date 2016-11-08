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

  getCategories(): Observable<any[]>{

    let options = new RequestOptions({ headers: this.getHeadersWithAuth()});

    return this.http.get(this.ctapUrl+"categories", options)
                    .map(this.extractCategories)
                    .catch(this.handleError);
  }

  private getHeadersWithAuth(){
    return new Headers({
      "Authorization":"Bearer "+this.auth.getAccessToken()
    });
  }

  private extractCategories(res: Response){
    let body = res.json();
    return body.categories || { };
  }

  private extractContent(res: Response){
    let body = res.json();
    return body || { };
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

  getContent(category){

    let params = new URLSearchParams();
    params.set('categoryId', category.id); // the user's search value
    params.set('limit', "6"); // the user's search value

    let options = new RequestOptions({
      headers: this.getHeadersWithAuth(),
      search: params

    });

    return this.http.get(this.ctapUrl+"agg/content/", options)
      .map(this.extractContent)
      .catch(this.handleError);
  }

  getSuggestions(keyword){

  }

}
