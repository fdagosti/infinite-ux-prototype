import { Component, Directive, Input, TemplateRef, ContentChildren, QueryList, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';

let nextId = 0;

/**
 * Represents an individual slide to be used within a carousel.
 */
@Directive({selector: 'template[iuxSlide]'})
export class IuxSlide {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `iux-slide-${nextId++}`;
  constructor(public tplRef: TemplateRef<any>) {
    console.log("constructor of slide")
  }
}


@Component({
  selector: 'iux-content-carousel',
  templateUrl: './content-carousel.component.html',
  styleUrls: ['./content-carousel.component.css'],
  host: {
    'class': 'carousel slide',
  }
})
export class ContentCarouselComponent implements AfterContentChecked,
  OnDestroy, OnInit {
  @ContentChildren(IuxSlide) slides: QueryList<IuxSlide>;


  wrap = true;
  /**
   * The active slide id.
   */
  @Input() activeId: string;

  ngAfterContentChecked() {
    console.log("slides ",this.slides);
    let activeSlide = this._getSlideById(this.activeId);
    this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
  }

  ngOnDestroy(): void {
  }

  constructor() { }

  ngOnInit() {
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

  cycleToSelected(slideIdx: string) {
    let selectedSlide = this._getSlideById(slideIdx);
    if (selectedSlide) {
      this.activeId = selectedSlide.id;
    }
  }

  keyPrev() {
    this.prev();
  }

  keyNext() {
    this.next();
  }

  private _getNextSlide(currentSlideId: string): string {
    const slideArr = this.slides.toArray();
    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
    const isLastSlide = currentSlideIdx === slideArr.length - 1;

    return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
      slideArr[currentSlideIdx + 1].id;
  }

  private _getSlideIdxById(slideId: string): number {
    return this.slides.toArray().indexOf(this._getSlideById(slideId));
  }

  private _getPrevSlide(currentSlideId: string): string {
    const slideArr = this.slides.toArray();
    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
    const isFirstSlide = currentSlideIdx === 0;

    return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
      slideArr[currentSlideIdx - 1].id;
  }



  private _getSlideById(slideId: string): IuxSlide {
    let slideWithId: IuxSlide[] = this.slides.filter(slide => slide.id === slideId);
    return slideWithId.length ? slideWithId[0] : null;
  }

}
