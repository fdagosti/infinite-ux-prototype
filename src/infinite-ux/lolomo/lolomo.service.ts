import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class LolomoService {

  /**
   * returns the list of rows a lolomo component should display
   * Each Row should follow the LolomoRow Interface
   */
  public getLolomoRows():Observable<any>{return null;}
}
