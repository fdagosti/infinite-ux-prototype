import {
  Component, Input, OnInit, AfterContentChecked, OnDestroy, QueryList, ViewChildren, Output,
  EventEmitter, trigger, state, style, transition, animate
} from "@angular/core";
import {CtapService} from "../../ctap.service";
import {ContentRowComponent} from "../content-row/content-row.component";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'iux-content-carousel',
  templateUrl: './content-carousel.component.html',
  styleUrls: ['./content-carousel.component.css'],
  host: {
    'class': 'carousel slide ',
  },

})
export class ContentCarouselComponent implements AfterContentChecked,
  OnDestroy, OnInit{


  @Input() categoryId;
  @Input() vertical;
  @Input() showIndicator;
  private content;
  private pageNum=0;
  private pages=Array(1);

  private errorMessage;
  private busy:Subscription;

  @Input() private numberOfItemsPerPage = 6;
  @Output() multiPage = new EventEmitter();

  @ViewChildren(ContentRowComponent) rows : QueryList<ContentRowComponent>;

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

  constructor(public ctap:CtapService) {
  }

  ngOnInit() {
    this.busy = this.ctap.getContent(this.categoryId)
      .subscribe(
        content => {
          this.content = content;
          this.computePageSize();
        },
        error => this.errorMessage = <any>error
      );
  }

  computePageSize(){
    this.pageNum = Math.ceil(this.content.total/this.numberOfItemsPerPage);
    this.pages = Array(this.pageNum).fill(1).map((_,i)=>i*this.numberOfItemsPerPage);
    this.setIndexes(this.activeId);
    this.multiPage.emit(this.pageNum > 1);


  }

  /**
   * Navigate to the next slide.
   */
  prev() {

    this.cycleToPrev();
  }

  /**
   * Navigate to the next slide.
   */
  next() {

    this.cycleToNext();
  }

  cycleToNext() { this.cycleToSelected(this._getNextSlide(this.activeId)); }

  cycleToPrev() { this.cycleToSelected(this._getPrevSlide(this.activeId)); }

  cycleToSelected(slideIdx: number) {
      this.setIndexes(slideIdx)

    let rows = this.rows.toArray();
    rows[this.activeId].fetchContent();
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

  keyPrev() {
    this.prev();
  }

  keyNext() {
    this.next();
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
