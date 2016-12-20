import {Component, OnInit, state, style, trigger, transition, animate} from '@angular/core';

@Component({
  selector: 'iux-jawbone',
  templateUrl: './jawbone.component.html',
  styleUrls: ['./jawbone.component.css'],
  animations: [
    trigger('jawboneAppear', [
      state("*", style({
        height: "40vw",
        opacity: "1"
      })),
      state("void", style({
        height: "0",
        opacity: "0"
      })),
      transition(":enter", animate(".4s cubic-bezier(0.5, 0, 0.1, 1)")),
      transition(":leave", animate(".4s cubic-bezier(0.5, 0, 0.1, 1)")),

    ])],
  host: {
    "[@jawboneAppear]": "jawboneState"
}
})
export class JawboneComponent implements OnInit {

  private jawboneState;

  constructor() { }

  ngOnInit() {
  }

}
