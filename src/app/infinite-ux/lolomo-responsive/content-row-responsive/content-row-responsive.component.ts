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
import {horizontalScroll, nextAnim, prevAnim} from "./animations";


class ContentRow{
  content:{
    media
  }
}

const PORTRAIT_SIZE = {w:213,h:318};
const LANDSCAPE_SIZE = {w:399,h:225};

@Component({
  selector: 'iux-content-row-responsive',
  templateUrl: 'content-row-responsive.component.html',
  styleUrls: ['content-row-responsive.component.css'],
  animations: [
    horizontalScroll
  ]

})
export class ContentRowResponsiveComponent implements OnInit, AfterViewInit, OnChanges {

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
  private inAnim = false;

  next(){
    if (this.inAnim) return;
    // console.log("NEXT ",this.pageAnimState, this.percentageOffset, this.nextAnim[Math.floor(this.percentageOffset)]);
    this.inAnim = true;
    this.pageAnimState = nextAnim[Math.floor(this.percentageOffset)];
    this.fullContentOffset=(this.fullContentOffset + this.numberOfVisibleItems);
    if (this.fullContentOffset >= this.fullContent.length) this.fullContentOffset = 0;
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);


  }

  prev(){
    if (this.inAnim) return;
    // console.log("PREV ",this.pageAnimState, this.percentageOffset, this.prevAnim[Math.floor(this.percentageOffset)]);
    this.inAnim = true;
    this.pageAnimState = prevAnim[Math.floor(this.percentageOffset)];
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
