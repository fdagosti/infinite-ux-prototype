import {Directive, OnInit, OnDestroy} from "@angular/core";

@Directive({
  selector: '[iuxSpy]'
})
export class SpyDirective implements OnInit, OnDestroy {

  nextId = 0;

  constructor() { }

  ngOnInit()    { this.logIt(`onInit`); }

  ngOnDestroy() { this.logIt(`onDestroy`); }



  private logIt(msg: string) {
    console.log(`Spy #${this.nextId++} ${msg}`);
  }

}
