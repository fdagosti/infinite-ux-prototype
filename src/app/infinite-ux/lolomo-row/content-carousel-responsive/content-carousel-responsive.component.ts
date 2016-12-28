import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {ContentRowResponsiveComponent} from "../content-row-responsive/content-row-responsive.component";
import {IVPService} from "../../../ivp.service";


@Component({
  selector: 'iux-content-carousel-responsive',
  templateUrl: 'content-carousel-responsive.component.html',
  styleUrls: ['content-carousel-responsive.component.css'],
  host: {
    'class': 'carousel slide ',
  },

})
export class ContentCarouselResponsiveComponent implements OnInit{

  @Input() categoryId;
  @Input() portrait;
  @Input() showIndicator;
  @Input() rowIndex;
  private content=[];
  private totalNumberOfItems = 0;
  private contentOffset = 0;
  private pageNum=0;
  private pages=Array(1);



  private errorMessage;
  private busy:Subscription;

  @Output() multiPage = new EventEmitter();
  @Output("jawboneEmit") jawboneEmitter= new EventEmitter();

  @ViewChild(ContentRowResponsiveComponent) slider : ContentRowResponsiveComponent;

  private activePage: number = 0;
  private itemWindow;
  private focusOffset = 0;

  jawboneChanged(b){
    this.jawboneEmitter.emit(b);
}

  constructor(public ctap:IVPService) {
  }

  ngOnInit() {
    this.busy = this.fetchContent();
  }


  private dataFullyLoaded = false;

  fetchContent(){
    return this.ctap.getContent(this.categoryId, this.contentOffset, "20")
      // .delay(50000)
      .subscribe(
        content => {
          this.content = this.content.concat(content.content);
          this.totalNumberOfItems = content.total;
          this.contentOffset = this.content.length;
          this.dataFullyLoaded = (this.content.length === this.totalNumberOfItems);
          this.computePageSize();
          this.busy = null;
        },
        error => this.errorMessage = <any>error
      );
  }

  private computePageSize(){
    this.pageNum = Math.ceil(this.totalNumberOfItems/this.itemWindow);
    this.pages = Array(this.pageNum).fill(1).map((_,i)=>i*this.itemWindow);
    this.multiPage.emit(this.pageNum > 1);
    this.computeActivePage();
  }

  private computeActivePage(){
    this.activePage = Math.ceil(this.focusOffset/this.itemWindow);
  }

  updateVisibleItems(items){
    if (!items) return;
    this.itemWindow = items
    this.computePageSize();
  }

  updateOffset(offset){
    this.focusOffset = offset;
    if (!this.dataFullyLoaded && (this.contentOffset - this.focusOffset < 20)){
      this.fetchContent();
    }
    this.computeActivePage();
  }

  prev() {
    if (!this.busy) {
      this.slider.prev();
    }
  }

  next() {
    if (!this.busy){
      this.slider.next();
    }
  }
}
