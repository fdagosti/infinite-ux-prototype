import {
  Component,
  Input,
  OnInit,
  AfterContentChecked,
  OnDestroy,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter, ViewChild
} from "@angular/core";
import {Subscription} from "rxjs";
import {ContentRowComponent} from "../content-row/content-row.component";
import {IVPService} from "../../../ivp.service";


@Component({
  selector: 'iux-content-carousel',
  templateUrl: 'content-carousel.component.html',
  styleUrls: ['content-carousel.component.css'],
  host: {
    'class': 'carousel slide ',
  },

})
export class ContentCarouselComponent implements AfterContentChecked,
  OnDestroy, OnInit{


  @Input() categoryId;
  @Input() portrait;
  @Input() showIndicator;
  private content=[];
  private totalNumberOfItems = 0;
  private currentOffset = 0;
  private pageNum=0;
  private pages=Array(1);

  private errorMessage;
  private busy:Subscription;

  @Input() private numberOfItemsPerPage = 16;
  @Output() multiPage = new EventEmitter();

  @ViewChild(ContentRowComponent) slider : ContentRowComponent;

  wrap = true;
  /**
   * The active slide id.
   */
  private activeId: number = 0;
  private leftId:number;
  private rightId:number;

  ngAfterContentChecked() {
  }



  ngOnDestroy(): void {
  }

  constructor(public ctap:IVPService) {
  }

  ngOnInit() {
    this.fetchContent(0);
  }

  fetchContent(offset){
    this.busy = this.ctap.getContent(this.categoryId, this.currentOffset, `${this.numberOfItemsPerPage}`)
      .subscribe(
        content => {
          this.content = this.content.concat(content.content);
          this.totalNumberOfItems = content.total;
          this.computePageSize();
          console.log("content ",this.content);
          this.busy = null;
        },
        error => this.errorMessage = <any>error
      );
  }

  computePageSize(){
    this.currentOffset = this.content.length;
    this.pageNum = Math.ceil(this.totalNumberOfItems/this.numberOfItemsPerPage);
    this.pages = Array(this.pageNum).fill(1).map((_,i)=>i*this.numberOfItemsPerPage);
    this.setIndexes(this.activeId);
    this.multiPage.emit(this.pageNum > 1);
  }



  prev() {
    if (!this.busy) {
      this.cycleToSelected(this._getPrevSlide(this.activeId));
      this.slider.prev();
    }
  }

  next() {
    if (!this.busy){
      this.cycleToSelected(this._getNextSlide(this.activeId));
      this.slider.next();
    }

  }

  cycleToSelected(slideIdx: number) {
    this.setIndexes(slideIdx);
    this.fetchContent(this.currentOffset);
  }

  private setIndexes(currentSlideIdx:number){
    this.activeId = currentSlideIdx;
    if (this.pages.length >1) {
      this.rightId = (currentSlideIdx + 1) % this.pages.length;
      this.leftId = (currentSlideIdx - 1 + this.pages.length) % this.pages.length;
    }else{
      this.rightId = -1;
      this.leftId = -1;
    }
  }


  private _getNextSlide(currentSlideId: number): number {
    const isLastSlide = currentSlideId === this.pages.length - 1;

    return isLastSlide ? (this.wrap ? 0 : this.pages.length - 1) :
      currentSlideId + 1;
  }


  private _getPrevSlide(currentSlideId: number): number {
    const isFirstSlide = currentSlideId === 0;

    return isFirstSlide ? (this.wrap ? this.pages.length - 1 : 0) :

    currentSlideId - 1;
  }





}
