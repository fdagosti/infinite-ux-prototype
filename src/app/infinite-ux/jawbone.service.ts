import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class JawboneService {

  jawboneEmitter:EventEmitter<any> = new EventEmitter();

  constructor() { }

  openJawbone(event){
    this.jawboneEmitter.emit(event);
  }

}
