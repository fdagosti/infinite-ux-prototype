import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class JawboneService {

  jawboneEmitters:EventEmitter<any>[] = [];
  private numberOfRows: number;

  constructor() { }

  setNumberOfRows(n){
    this.numberOfRows = n;
    if (this.jawboneEmitters.length > n) this.jawboneEmitters.length = n;
    else this.jawboneEmitters = this.jawboneEmitters.concat(new Array(n - this.jawboneEmitters.length).fill(null).map(()=>new EventEmitter()))
  }

  setJawboneStatus(idx, b){
    this.jawboneEmitters.forEach((e,i)=> e.emit(idx === i?b:false));

  }

  subscribe(idx, f){
    if (this.numberOfRows) {
      this.jawboneEmitters[idx].subscribe(f);
    }
  }
}
