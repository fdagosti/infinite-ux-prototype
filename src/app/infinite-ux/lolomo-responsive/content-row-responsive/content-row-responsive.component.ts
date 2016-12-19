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
import {horizontalScroll, animTable, zoomAnimation} from "./animations";


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


@Component({
  selector: 'iux-content-row-responsive',
  templateUrl: 'content-row-responsive.component.html',
  styleUrls: ['content-row-responsive.component.css'],
  animations: [
    horizontalScroll,
    zoomAnimation
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

  private window = new Array(6).fill(emptyItem);
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

    // console.log("FILL WINDOW ",this.window.map(i=>i.title), this.itemWindow.map(i=>this.window[i].title));

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
      this.inScrollAnim = false;
    });

  }

  pageAnimState;
  private percentageOffset;
  private inScrollAnim = false;

  next(){
    if (this.inScrollAnim) return;
    this.fullContentOffset=(this.fullContentOffset + this.numberOfVisibleItems);
    if (this.fullContentOffset >= this.fullContent.length){
      this.fullContentOffset = 0;
      this.fillWindow();
    } else{
      this.inScrollAnim = true;
      this.pageAnimState = animTable[Math.floor(this.percentageOffset)].animNext;
    }
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);
  }

  prev(){
    if (this.inScrollAnim) return;
    this.inScrollAnim = true;

    this.pageAnimState = animTable[Math.floor(this.percentageOffset)].animPrev;
    this.fullContentOffset-=this.numberOfVisibleItems;
    this.fullContentOffset = Math.max(this.fullContentOffset, 0);
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
    if (this.inScrollAnim) return;

    let firstItemSelected = idx === this.getFirstActionableItem();
    let lastItemSelected = idx === this.getLastActionableItem();

    if (idx < this.getFirstActionableItem() || idx > this.getLastActionableItem()){
      // don't launch animations on non fully visible Items
      return;
    }
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
    if (this.inScrollAnim) return;
    this.zoomState = this.zoomState.map(()=>"stop");
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
