import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter,
  NgZone,
  AfterViewInit
} from "@angular/core";
import {horizontalScroll, animTable, zoomAnimation} from "./animations";
import {Subject} from "rxjs";
import {JawboneService} from "../../jawbone.service";


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




  constructor(private zone: NgZone, private jawbone: JawboneService) { }

  @Input() private fullContent;
  private fullContentOffset = 0;
  @Output("offset") fullContentOffsetEmitter = new EventEmitter();

  @Input() private portrait = false;
  @Input() private zoom = true;

  @Input() rowIndex;

  private numberOfItems;
  private maxPastItems=0;
  // why 7 as a start value? because other values are causing an ng2 exception
  // TODO investigate why values of 0 or 1 create an exception
  private numberOfVisibleItems=7;
  @Output("visibleItem") visibleItemsEmitter = new EventEmitter();


  @ViewChild('slider') slider:ElementRef;

  private window = new Array(6).fill(emptyItem);


  private altContent;
  private imageSize;

  private errorMessage;

  ngOnInit() {
    this.imageSize = this.getImageSize(this.portrait);
    this.altContent = this.portrait?"assets/portrait.png":"assets/landscape.png";

    this.jawbone.subscribe(this.rowIndex, ()=>this.jawboneOpened=false);
    this.listenMouse();this.jawboneMoustListen();

  }

  ngAfterViewInit(): void {
    this.onResize(window.innerWidth);
  }

  /** START ZOOM ANIM MANAGEMENT*/
  private zoomState:string[] = this.window.map(()=>"stop");
  private visibleItemWindow = [];

  private zoomAnimStopper = new Subject();
  private zoomAnimStarter = new Subject()
    .delay(300)
    .takeUntil(this.zoomAnimStopper);


  listenMouse(){
    this.zoomAnimStarter
      .subscribe(
        value => {
          if (!this.jawboneOpened)
            this.launchZoomAnim(value);
        },
        e=>console.log("error"),
        ()=>{
          this.stopAnim();
          this.listenMouse();
        });
  }

  getFirstActionableItem(){
    if (this.percentageOffset != 0){
      return this.visibleItemWindow[1];
    }
    return this.visibleItemWindow[0];
  }

  getLastActionableItem(){
    if (this.visibleItemWindow.length === this.numberOfVisibleItems+2){
      return this.visibleItemWindow[this.visibleItemWindow.length-2];
    }else if (this.visibleItemWindow.length <= this.numberOfVisibleItems){
      return this.visibleItemWindow[this.visibleItemWindow.length-1];
    }else if (this.percentageOffset === 0){
      return this.visibleItemWindow[this.visibleItemWindow.length-2];
    }else{
      this.visibleItemWindow[this.visibleItemWindow.length-1];
    }

  }

  private computeVisibleItemWindow(actualPastItems){
    let pastItems = actualPastItems > 0?1:0;
    let startIdx = actualPastItems - pastItems;
    let lastIdx = Math.min(startIdx + this.numberOfVisibleItems + 1 + pastItems, this.window.length);
    this.visibleItemWindow = Array.apply(null, Array(lastIdx - startIdx)).map((_,i)=>startIdx + i);
  }

  launchZoomAnim(idx){

    if (this.inScrollAnim) return;

    let firstItemSelected = idx === this.getFirstActionableItem();
    let lastItemSelected = idx === this.getLastActionableItem();

    if (idx < this.getFirstActionableItem() || idx > this.getLastActionableItem()){
      // don't launch animations on non fully visible Items
      return;
    }
    this.visibleItemWindow.forEach((v)=>{
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

  /** END ZOOM ANIM MANAGEMENT*/



  // Jawbone management
  private jawboneOpened = false;
  private jawboneSelectedIx = false;

  private jawboneStopper = new Subject();
  private jawboneFocusStarter = new Subject()
    .delay(300)
    .takeUntil(this.jawboneStopper);
  @Output("jawboneOpen") private jawboneEmitter: EventEmitter<any> = new EventEmitter<any>();

  openJawbone(idx){
    this.jawboneEmitter.emit(this.window[idx]);
    this.jawbone.setJawboneStatus(this.rowIndex, this.window[idx]);
    this.jawboneSelectedIx = idx;
    this.jawboneOpened= true;
    this.stopAnim();
  }

  jawboneMoustListen(){
    this.jawboneFocusStarter
      .subscribe(
        value => {
          if (this.jawboneOpened)
            this.openJawbone(value);
        },
        e=>console.log("error"),
        ()=>{
          this.jawboneMoustListen();
        });
  }
  // End Jawbone management


  ngOnChanges(changes: any): void {

    let contentSizeChange = changes.fullContent && (changes.fullContent.previousValue.length != changes.fullContent.currentValue.length);

    if (this.window[0].empty || contentSizeChange)
      this.fillWindow();
  }

  private computeVisibleItems(w){
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
    return visibleItems;
  }

  onResize(w){

    let n = this.computeVisibleItems(w);

    if (this.numberOfVisibleItems != n){
      this.numberOfVisibleItems = n;
      this.maxPastItems = this.numberOfVisibleItems + 1;
      this.visibleItemsEmitter.emit(this.numberOfVisibleItems);
      this.fillWindow();
    }
  }

  fillWindow(){
    if (this.fullContent.length == 0 || this.inScrollAnim) return;

    this.numberOfItems = (this.numberOfVisibleItems * 2 + 1) + (this.fullContentOffset?(this.numberOfVisibleItems +1):0);

    let computedOffset = Math.max(this.fullContentOffset - this.maxPastItems,0);

    this.window = this.fullContent.slice(computedOffset, computedOffset+this.numberOfItems);

    let actualPastItems = this.fullContentOffset - computedOffset;

    this.zoomState = new Array(this.window.length).fill("stop");

    this.computeVisibleItemWindow(actualPastItems);

    this.translateListToShowPastItems(actualPastItems);
  }

  // translate the slider so that past items are displayed on the left of the screen
  private translateListToShowPastItems(actualPastItems: number) {
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

  private getPlayLink(program){
    if (!program || !program._links || !program._links.playSession) return "./";

    return '/video/'+program.id;
  }

  getContentImage(item){
    if (item.media){
      return item.media[this.portrait?5:1].url;
    }else{
      return this.altContent;
    }
  }



}
