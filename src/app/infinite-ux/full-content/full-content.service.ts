import {Injectable} from "@angular/core";
import {Params} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class FullContentService {

  public getFullContentData(params:Params, offset):Observable<any>{return null;}

  // TODO to merge with the previous method when needed
  public getScrollUpdateData(id, offset):Observable<any>{return null;}
}
