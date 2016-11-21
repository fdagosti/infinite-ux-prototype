import {Component, Input, OnInit, AfterContentChecked, OnDestroy, QueryList, ViewChildren} from "@angular/core";
import {CtapService} from "../../ctap.service";
import {ContentRowComponent} from "../content-row/content-row.component";


@Component({
  selector: 'iux-content-carousel',
  templateUrl: './content-carousel.component.html',
  styleUrls: ['./content-carousel.component.css'],
  host: {
    'class': 'carousel slide',
  }
})
export class ContentCarouselComponent implements AfterContentChecked,
  OnDestroy, OnInit{


  @Input() categoryId;
  private content;
  private pageNum=0;
  private pages=Array(1);

  private errorMessage;

  @Input() private numberOfItemsPerPage = 6;


  @ViewChildren(ContentRowComponent) rows : QueryList<ContentRowComponent>;

  wrap = true;
  /**
   * The active slide id.
   */
  activeId: number = 0;

  ngAfterContentChecked() {
  }



  ngOnDestroy(): void {
  }

  constructor(public ctap:CtapService) {
  }

  ngOnInit() {
    this.ctap.getContent(this.categoryId)
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
    this.pages = Array(this.pageNum);
    for (let i = 0; i < this.pages.length;i++){
      this.pages[i] = i*this.numberOfItemsPerPage;
    }
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

      this.activeId = slideIdx;
    let rows = this.rows.toArray();
    rows[this.activeId].fetchContent();
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
