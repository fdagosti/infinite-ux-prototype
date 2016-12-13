import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges} from "@angular/core";
import {Subscription, Observable} from "rxjs";


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
export class ContentRowComponent implements OnInit, OnChanges, AfterViewInit {
  ngAfterViewInit(): void {
    console.log("After view init ",window.innerWidth);
    this.onResize(window.innerWidth);
  }

  constructor() { }

  @Input() private fullContent;

  @Input() private portrait = false;
  @Input() private zoom = true;

  private numberOfItems;
  private numberOfVisibleItems;

  @ViewChild('slider') slider:ElementRef;


  private windowSize = 18;
  private window = Array[this.windowSize];
  private fullContentOffset = 0;
  private altContent;
  private imageSize;

  private errorMessage;

  ngOnInit() {
    this.imageSize = this.getImageSize(this.portrait);
    this.altContent = this.portrait?"assets/portrait.png":"assets/landscape.png";
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
      this.updateWindow(n);
    }

    console.log("Number of Items ",this.numberOfItems);
  }

  updateWindow(n){
    this.numberOfItems = n;
    this.fillWindow();
  }


  ngOnChanges(changes: SimpleChanges){
    console.log("CHANGES ",changes);
    this.fillWindow();
  }

  fillWindow(){
    console.log("fillWindow ");
    this.window = this.fullContent.slice(this.fullContentOffset, this.fullContentOffset+this.numberOfItems);

  }

  private getImageSize(portrait){
    if (portrait){
      return PORTRAIT_SIZE;
    }else {
      return LANDSCAPE_SIZE;
    }
  }

  next(){
    this.fullContentOffset+=this.numberOfVisibleItems;
    this.fillWindow();
    // this.slider.nativeElement.style.transform='translate3d(-100%,0px, 0px)';
  }

  prev(){
    this.fullContentOffset-=this.numberOfVisibleItems;
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
