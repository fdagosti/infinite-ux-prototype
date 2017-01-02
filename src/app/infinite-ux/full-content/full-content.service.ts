import {Injectable} from "@angular/core";
import {Params} from "@angular/router";

@Injectable()
export class FullContentService {

  public getFullContentData(params:Params, offset){}

  // TODO to merge with the previous method when needed
  public getScrollUpdateData(id, offset){}
}
