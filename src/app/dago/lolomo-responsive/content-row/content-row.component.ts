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
  EventEmitter
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

})
export class ContentRowComponent implements OnInit, AfterViewInit, OnChanges {


  constructor() { }

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
    let percentageOffset = actualPastItems * oneItemPercentage;
    this.slider.nativeElement.style.transform=`translate3d(-${percentageOffset}%,0px, 0px)`;
  }

  private getImageSize(portrait){
    if (portrait){
      return PORTRAIT_SIZE;
    }else {
      return LANDSCAPE_SIZE;
    }
  }

  next(){
    this.fullContentOffset=(this.fullContentOffset + this.numberOfVisibleItems);
    if (this.fullContentOffset >= this.fullContent.length) this.fullContentOffset = 0;
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);
    this.fillWindow();

  }

  prev(){
    this.fullContentOffset-=this.numberOfVisibleItems;
    this.fullContentOffset = Math.max(this.fullContentOffset, 0);
    this.fullContentOffsetEmitter.emit(this.fullContentOffset);
    this.fillWindow();
    // this.slider.nativeElement.style.transform='translate3d(100%,0px, 0px)';
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
