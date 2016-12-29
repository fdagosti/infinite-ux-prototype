import {Component, OnInit, Input} from "@angular/core";
import {IVPService, Category} from "../../ivp.service";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs";
import {JawboneService} from "../jawbone.service";


@Component({
  selector: 'iux-full-content',
  templateUrl: 'full-content.component.html',
  styleUrls: ['full-content.component.css'],
  providers: [
    JawboneService
  ]
})
export class FullContentComponent implements OnInit {

  private content;
  private pageNum=0;
  private pages=Array(0);
  private categoryId;
  private title:string;
  private catBased = true;

  private numberOfItemsPerPage = 2;
  private projectedContent=[];

  private busy;
  private jawboneOpened=[];

  constructor(
    private ctap:IVPService,
    private route:ActivatedRoute,
    private jawbone:JawboneService
  ) {}

  ngOnInit() {
    this.inData = true;
    this.route.params
      .switchMap((params:Params) => {
          if (params['categoryId']) {
            this.categoryId = params['categoryId'];
            this.catBased= true;

            return Observable.forkJoin(
              this.ctap.getContent(this.categoryId, this.currentOffset, "30"),
              this.ctap.getCategories(params['categoryId'])).take(1)
              .do(result => {
                this.content = result[0];
                this.title = result[1].name;
              })
          } else {
            this.categoryId = params['contentName'];
            this.title = params['contentName'];
            this.catBased= false;

            return this.ctap.getContentFromSearchedTerm(params['contentName'], 0, "200")
              .do(result => this.content = result)
          }
        }
        )
      .subscribe(
        () => {this.inData = false;this.computePageSize()},
        error => console.log("ERRROR",error),
        ()=>console.log("REQUEST ENDED")
      );
  }

  private currentOffset = 0;

  private inData = false;

  private fetchCategoryContent(){
    if (this.inData) return;
    this.currentOffset += 30;
    this.inData = true;
    this.busy = this.ctap.getContent(this.categoryId, this.currentOffset, "30").subscribe(
      v=>{this.content.content = this.content.content.concat(v.content)},
      e=>console.log("error",e),
      ()=>{this.inData = false;this.computePageSize()}
    );
  }

  onScroll(){
    if (this.catBased)
      this.fetchCategoryContent();
  }

  jawboneChanged(ev,i){
    this.jawboneOpened.fill(false);
    this.jawboneOpened[i] = ev;
  }

  closeJawbone(i){
    this.jawboneOpened[i]=false
    this.jawbone.setJawboneStatus(i, false);
  }

  updateVisibleItems(ev, idx){
    if (idx != 0) return;
    this.numberOfItemsPerPage = ev;
    setTimeout(()=> {
      this.computePageSize();
      }, 0
    );

  }

  computePageSize(){
    this.pageNum = Math.ceil(this.content.content.length/this.numberOfItemsPerPage);
    let temporaryArray = Array(this.pageNum).fill(1);
    this.pages = temporaryArray.map((x, i) => i*this.numberOfItemsPerPage);
    this.jawbone.setNumberOfRows(this.pageNum);
    this.jawboneOpened = this.pages.map(() => false)
    this.projectedContent = this.pages.map((v)=>this.content.content.slice(v, v+this.numberOfItemsPerPage))
  }

  getSource(term, page){
    if (this.catBased){
      return this.ctap.getContent(term, page);
    }else {
      return this.ctap.getContentFromSearchedTerm(term, page);
    }
  }

}
