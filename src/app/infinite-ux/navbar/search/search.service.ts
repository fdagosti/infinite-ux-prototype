import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class SearchService {

  constructor() { }

  public getSuggestions(term):Observable<any>{return null;}

}
