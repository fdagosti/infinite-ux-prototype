import {
  Component, OnInit, state, style, trigger, transition, animate, Input, Output,
  EventEmitter
} from '@angular/core';

class ContentRow{
  content:{
    media
  }
}

@Component({
  selector: 'iux-jawbone',
  templateUrl: './jawbone.component.html',
  styleUrls: ['./jawbone.component.css'],
  animations: [
  trigger('jawboneAppear', [
    state("*", style({
      height: "35vw",
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
  @Input() program;
  @Output("closeJawbone")closeJawboneEmitter = new EventEmitter();
  private jawboneState;
  private altContent;

  private jawboneContent =[
    {
      title: "Overview",
    },
    {
      title: "More Like This",
    },
    {
      title: "Show Details",
    },
  ];

  private currentContent=this.jawboneContent[0];


  constructor() {
  }

  ngOnInit() {
    this.altContent = "assets/landscape.png";
  }

  closeJawbone(){
    this.closeJawboneEmitter.emit("close");
  }

  getContentImage(program){
    if (program.media){
      return program.media[2].url;
    }else{
      return this.altContent;
    }
  }

}
