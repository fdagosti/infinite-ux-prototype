import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter, trigger, state, style, transition, animate, NgZone
} from "@angular/core";


class ContentRow{
  content:{
    media
  }
}

const PORTRAIT_SIZE = {w:213,h:318};
const LANDSCAPE_SIZE = {w:399,h:225};

@Component({
  selector: 'iux-content-row',
  templateUrl: 'content-row.component.html',
  styleUrls: ['content-row.component.css'],
  animations: [
    trigger('horizontalScroll', [

      state('next',style({})),
      state('previous',   style({})),
      state('stop',   style({})),
      transition('* => next0', [
        animate('750ms ease-out', style({transform: 'translate3d(-100%,0px, 0px)'}))
      ]),
      transition('* => next100', [
        animate('750ms ease-out', style({transform: 'translate3d(-200%,0px, 0px)'}))
      ]),
      transition('* => next116', [
        animate('750ms ease-out', style({transform: 'translate3d(-216.66666666%,0px, 0px)'}))
      ]),
      transition('* => next120', [
        animate('750ms ease-out', style({transform: 'translate3d(-220%,0px, 0px)'}))
      ]),
      transition('* => next125', [
        animate('750ms ease-out', style({transform: 'translate3d(-225%,0px, 0px)'}))
      ]),
      transition('* => next133', [
        animate('750ms ease-out', style({transform: 'translate3d(-233.3333333%,0px, 0px)'}))
      ]),
      transition('* => next150', [
        animate('750ms ease-out', style({transform: 'translate3d(-250%,0px, 0px)'}))
      ]),
      transition('* => previous0', [
        animate('750ms ease-out', style({transform: 'translate3d(0%,0px, 0px)'}))
      ]),
      transition('* => previous100', [
        animate('750ms ease-out', style({transform: 'translate3d(0%,0px, 0px)'}))
      ]),
      transition('* => previous116', [
        animate('750ms ease-out', style({transform: 'translate3d(-16.66666666%,0px, 0px)'}))
      ]),
      transition('* => previous120', [
        animate('750ms ease-out', style({transform: 'translate3d(-20%,0px, 0px)'}))
      ]),
      transition('* => previous125', [
        animate('750ms ease-out', style({transform: 'translate3d(-25%,0px, 0px)'}))
      ]),
      transition('* => previous133', [
        animate('750ms ease-out', style({transform: 'translate3d(-33.333333%,0px, 0px)'}))
      ]),
      transition('* => previous150', [
        animate('750ms ease-out', style({transform: 'translate3d(-50%,0px, 0px)'}))
      ]),
    ])
  ]

})
export class ContentRowComponent implements OnInit, AfterViewInit, OnChanges {




  constructor(private zone: NgZone) { }

  @Input() private fullContent;
  private fullContentOffset = 0;
  @Output("offset") fullContentOffsetEmitter = new EventEmitter();

  @Input() private portrait = false;
  @Input() private zoom = true;

  private numberOfItems;
  private maxPastItems;
  private numberOfVisibleItems;
  @Output("visibleItem") visibleItemsEmitter = new EventEmitter();


  @ViewChild('slider') slider:ElementRef;

  private windowSize = 18;
  private window = Array[this.windowSize];

  private altContent;
  private imageSize;

  private errorMessage;

  ngOnInit() {
    this.imageSize = this.getImageSize(this.portrait);
    this.altContent = this.portrait?"assets/portrait.png":"assets/landscape.png";
  }

  ngAfterViewInit(): void {
    this.onResize(window.innerWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillWindow();
  }


  onResize(w){
    let visibleItems = 6;
    if (w > 1400){
      visibleItems = 6;
    }else if (w > 1100){
      visibleItems = 5;
    }else if (w > 800){
      visibleItems = 4;
    }else if (w > 500){
      visibleItems = 3;
    }else{
      visibleItems = 2;
    }

    let n = visibleItems*3 + 2;
    this.numberOfVisibleItems = visibleItems;
    if (this.numberOfItems != n){
      this.maxPastItems = visibleItems + 1;
      this.visibleItemsEmitter.emit(this.numberOfVisibleItems);
      this.numberOfItems = n;
      this.fillWindow();
    }
  }

  fillWindow(){
    // console.log("fillWindow ",this.fullContentOffset, this.numberOfItems, this.maxPastItems);
    let computedOffset = Math.max(this.fullContentOffset - this.maxPastItems,0);
    this.window = this.fullContent.slice(computedOffset, computedOffset+this.numberOfItems);

    let actualPastItems = this.fullContentOffset - computedOffset;
    let oneItemPercentage = 100 / this.numberOfVisibleItems;
    this.percentageOffset = actualPastItems * oneItemPercentage;
    this.slider.nativeElement.style.transform=`translate3d(-${this.percentageOffset}%,0px, 0px)`;
  }

  private getImageSize(portrait){
    if (portrait){
      return PORTRAIT_SIZE;
    }else {
      return LANDSCAPE_SIZE;
    }
  }

  animationStarted(e){
    // console.log("ANIMATION Started ",e);
  }

  animationDone(e){
    // console.log("Animation Done ",e);

    // Bug workaround. See https://github.com/angular/angular/issues/11881
    this.zone.run(() => {
      this.pageAnimState="stop";
      this.fillWindow();
      this.inAnim = false;
    });

  }

  pageAnimState;
  private percentageOffset;
  private nextAnim = {
    "0":"next0",
    "100":"next100",
    "116":"next116",
    "120":"next120",
    "125":"next125",
    "133":"next133",
    "150":"next150",
  }
  private prevAnim = {
    "0":"previous0",
    "100":"previous100",
    "116":"previous116",
    "120":"previous120",
    "125":"previous125",
    "133":"previous133",
    "150":"previous150",
  }
  private inAnim = false;

  next(){
    if (this.inAnim) return;
    // console.log("NEXT ",this.pageAnimState, this.percentageOffset, this.nextAnim[Math.floor(this.percentageOffset)]);
    this.inAnim = true;
    this.pageAnimState = this.nextAnim[Math.floor(this.percentageOffset)];
    this.fullContentOffset=(this.fullContentOffset + this.numberOfVisibleItems);
    if (this.fullContentOffset >= this.fullContent.length) this.fullContentOffset = 0;
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);


  }

  prev(){
    if (this.inAnim) return;
    // console.log("PREV ",this.pageAnimState, this.percentageOffset, this.prevAnim[Math.floor(this.percentageOffset)]);
    this.inAnim = true;
    this.pageAnimState = this.prevAnim[Math.floor(this.percentageOffset)];
    this.fullContentOffset-=this.numberOfVisibleItems;
    this.fullContentOffset = Math.max(this.fullContentOffset, 0);
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);
  }

  private getPlayLink(program){
    if (!program) return "./";
    if (!program._links.playSession) return "./";

    return '/video/'+program.id;
  }



  getContentImage(item){

    if (item.content.media){
      return item.content.media[this.portrait?5:1].url;
    }else{
      return this.altContent;
    }
  }


}
