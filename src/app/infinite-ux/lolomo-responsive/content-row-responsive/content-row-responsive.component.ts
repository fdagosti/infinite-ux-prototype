import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  NgZone, AfterViewInit, trigger, transition, animate, style, state
} from "@angular/core";
import {horizontalScroll, animTable} from "./animations";


class ContentRow{
  content:{
    media
  }
}

const PORTRAIT_SIZE = {w:213,h:318};
const LANDSCAPE_SIZE = {w:399,h:225};

const emptyItem = {
  _links:{},
  content:{},
  empty: true

}

const zoomAnimate = [animate(".4s 300ms cubic-bezier(0.5, 0, 0.1, 1) 0s")];
const instantZoomAnimate = [animate(".4s cubic-bezier(0.5, 0, 0.1, 1) 0s")];

@Component({
  selector: 'iux-content-row-responsive',
  templateUrl: 'content-row-responsive.component.html',
  styleUrls: ['content-row-responsive.component.css'],
  animations: [
    horizontalScroll,
    trigger('ZoomItem', [
      state("itemOpenedLeft", style({
        transform: `translate3d(-41%,0px, 0px)`
      })),
      state("itemOpenedRight", style({
        transform: `translate3d(41%,0px, 0px)`
      })),
      state("itemOpenedRightFromBeginning", style({
        transform: `translate3d(82%,0px, 0px)`
      })),
      state("itemOpenedLeftFromEnd", style({
        transform: `translate3d(-82%,0px, 0px)`
      })),
      state("zoomSelectedItem", style({
        transform: `scale(1.8)`
      })),
      state("zoomSelectedItemBeginning", style({
        transform: `scale(1.8) translate3d(23%,0px, 0px)`
      })),
      state("zoomSelectedItemEnd", style({
        transform: `scale(1.8) translate3d(-23%,0px, 0px)`
      })),

      state("portraitItemOpenedLeft", style({
        transform: `translate3d(-11%,0px, 0px)`
      })),
      state("portraitItemOpenedRight", style({
        transform: `translate3d(11%,0px, 0px)`
      })),
      state("portraitItemOpenedRightFromBeginning", style({
        transform: `translate3d(22%,0px, 0px)`
      })),
      state("portraitItemOpenedLeftFromEnd", style({
        transform: `translate3d(-22%,0px, 0px)`
      })),
      state("portraitZoomSelectedItem", style({
        transform: `scale(1.2)`
      })),
      state("portraitZoomSelectedItemBeginning", style({
        transform: `scale(1.2) translate3d(8%,0px, 0px)`
      })),
      state("portraitZoomSelectedItemEnd", style({
        transform: `scale(1.2) translate3d(-8%,0px, 0px)`
      })),



      transition('* => itemOpenedLeft', zoomAnimate),
      transition('* => itemOpenedLeftFromEnd', zoomAnimate),
      transition('* => itemOpenedRightFromBeginning', zoomAnimate),
      transition('* => itemOpenedRight', zoomAnimate),
      transition('* => zoomSelectedItem', zoomAnimate),
      transition('* => zoomSelectedItemBeginning', zoomAnimate),
      transition('* => zoomSelectedItemEnd', zoomAnimate),

      transition('* => portraitItemOpenedLeft', zoomAnimate),
      transition('* => portraitItemOpenedRight', zoomAnimate),
      transition('* => portraitItemOpenedRightFromBeginning', zoomAnimate),
      transition('* => portraitItemOpenedLeftFromEnd', zoomAnimate),
      transition('* => portraitZoomSelectedItem', zoomAnimate),
      transition('* => portraitZoomSelectedItemBeginning', zoomAnimate),
      transition('* => portraitZoomSelectedItemEnd', zoomAnimate),

    ])
  ]

})
export class ContentRowResponsiveComponent implements OnInit, AfterViewInit, OnChanges {


  private itemWindow = [];

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

  private windowSize = 6;
  private window = new Array(this.windowSize).fill(emptyItem);
  private zoomState:string[] = this.window.map(()=>"stop");

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
    if (this.window[0].empty)
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

  computeVisibleItemsIdx(actualPastItems){

    let pastItems = actualPastItems > 0?1:0;
    let startIdx = actualPastItems - pastItems;
    let lastIdx = Math.min(startIdx + this.numberOfVisibleItems + 1 + pastItems, this.window.length);
    this.itemWindow = Array.apply(null, Array(lastIdx - startIdx)).map((_,i)=>startIdx + i);
  }

  fillWindow(){
    if (this.fullContent.length == 0) return;

    let computedOffset = Math.max(this.fullContentOffset - this.maxPastItems,0);
    this.window = this.fullContent.slice(computedOffset, computedOffset+this.numberOfItems);

    let actualPastItems = this.fullContentOffset - computedOffset;
    this.zoomState = new Array(this.window.length).fill("stop");

    this.computeVisibleItemsIdx(actualPastItems);
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
  }

  animationDone(e){
    // Bug workaround. See https://github.com/angular/angular/issues/11881
    this.zone.run(() => {
      this.pageAnimState="stop";
      this.fillWindow();
      this.inAnim = false;
    });

  }

  pageAnimState;
  private percentageOffset;
  private inAnim = false;

  next(){
    if (this.inAnim) return;
    this.fullContentOffset=(this.fullContentOffset + this.numberOfVisibleItems);
    if (this.fullContentOffset >= this.fullContent.length){
      this.fullContentOffset = 0;
      this.fillWindow();
    } else{
      this.inAnim = true;
      this.pageAnimState = animTable[Math.floor(this.percentageOffset)].animNext;
    }
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);


  }

  getFirstActionableItem(){
    if (this.percentageOffset != 0){
      return this.itemWindow[1];
    }
    return this.itemWindow[0];
  }

  getLastActionableItem(){
    if (this.fullContent.length === this.itemWindow[this.itemWindow.length]){
      return this.itemWindow[this.itemWindow.length-1];
    }
    return this.itemWindow[this.itemWindow.length-2];
  }

  launchZoomAnim(idx){
    let firstItemSelected = idx === this.getFirstActionableItem();
    let lastItemSelected = idx === this.getLastActionableItem();

    this.itemWindow.forEach((v)=>{
      if (firstItemSelected){
        if (v === idx) {this.zoomState[v] = this.portrait?"portraitZoomSelectedItemBeginning":"zoomSelectedItemBeginning";}
        else if (v > idx) this.zoomState[v] = this.portrait?"portraitItemOpenedRightFromBeginning":"itemOpenedRightFromBeginning";
      }
      else if (lastItemSelected){
        if (v === idx) {this.zoomState[v] = this.portrait?"portraitZoomSelectedItemEnd":"zoomSelectedItemEnd";}
        else if (v < idx) this.zoomState[v] = this.portrait?"portraitItemOpenedLeftFromEnd":"itemOpenedLeftFromEnd";
      }
      else if (v === idx) this.zoomState[v] = this.portrait?"portraitZoomSelectedItem":"zoomSelectedItem";
      else if (v<idx) this.zoomState[v] = this.portrait?"portraitItemOpenedLeft":"itemOpenedLeft";
      else if (v>idx) this.zoomState[v] = this.portrait?"portraitItemOpenedRight":"itemOpenedRight";

    });
  }

  stopAnim(){
    this.zoomState = this.zoomState.map(()=>"stop");

  }

  prev(){
    if (this.inAnim) return;
    this.inAnim = true;

    this.pageAnimState = animTable[Math.floor(this.percentageOffset)].animPrev;
    this.fullContentOffset-=this.numberOfVisibleItems;
    this.fullContentOffset = Math.max(this.fullContentOffset, 0);
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);
  }

  private getPlayLink(program){
    if (!program || !program._links || !program._links.playSession) return "./";

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
