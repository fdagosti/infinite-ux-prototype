import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {JawboneService} from "../content-row-responsive/jawbone.service";
import {FullContentService} from "./full-content.service";
import {Observable} from "rxjs";


@Component({
  selector: 'iux-full-content',
  templateUrl: 'full-content.component.html',
  styleUrls: ['full-content.component.css'],
  providers: [
    JawboneService
  ]
})
export class FullContentComponent implements OnInit {

  private pageNum=0;
  private pages=Array(0);

  private fullContentData = {
    id : "toto",
    portrait : true,
    title: "",
    content:{
      content: [],
      total: 0
    }
  };

  private numberOfItemsPerPage = 2;
  private projectedContent=[];

  private busy;
  private jawboneOpened=[];

  constructor(
    private fullContentService:FullContentService,
    private route:ActivatedRoute,
    private jawbone:JawboneService
  ) {}

  ngOnInit() {
    this.inData = true;
    this.route.params
      .switchMap((params:Params) => this.getObservable(params))
      .do(()=>this.inData = false)
      .subscribe(
        (v) => {this.fullContentData = v;this.inData = false;this.computePageSize()},
        error => console.log("ERRROR",error),
        ()=>console.log("REQUEST ENDED")
      );
  }

  private getObservable(params:Params){
    return this.fullContentService.getFullContentData(params, this.currentOffset);
  }

  private currentOffset = 0;

  private inData = false;

  private fetchCategoryContent(){
    if (this.inData) return;
    this.currentOffset += 30;
    this.inData = true;
    this.busy = this.fullContentService.getScrollUpdateData(this.fullContentData.id, this.currentOffset).subscribe(
      v=>{this.fullContentData.content.content = this.fullContentData.content.content.concat(v.content)},
      e=>console.log("error",e),
      ()=>{this.inData = false;this.computePageSize()}
    );
  }

  private isCacheFull(){
    return this.fullContentData.content?this.fullContentData.content.content.length >= this.fullContentData.content.total:false;
  }

  onScroll(){
    if (this.fullContentData.portrait && !this.isCacheFull())
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
    this.pageNum = Math.ceil(this.fullContentData.content.content.length/this.numberOfItemsPerPage);
    let temporaryArray = Array(this.pageNum).fill(1);
    this.pages = temporaryArray.map((x, i) => i*this.numberOfItemsPerPage);
    this.jawbone.setNumberOfRows(this.pageNum);
    this.closeAllJawbones();
    this.projectedContent = this.pages.map((v)=>this.fullContentData.content.content.slice(v, v+this.numberOfItemsPerPage))
  }

  closeAllJawbones(){
    this.jawboneOpened = this.pages.map(() => false);
    this.jawbone.setJawboneStatus(-1, false);
  }

}
