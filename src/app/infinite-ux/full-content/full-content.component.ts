import {Component, OnInit, Input} from "@angular/core";
import {IVPService, Category} from "../../ivp.service";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs";


@Component({
  selector: 'iux-full-content',
  templateUrl: 'full-content.component.html',
  styleUrls: ['full-content.component.css']
})
export class FullContentComponent implements OnInit {

  private content;
  private pageNum=0;
  private pages=Array(0);
  private categoryId;
  private title:string;
  private catBased = true;

  private errorMessage;

  @Input() private numberOfItemsPerPage = 6;


  constructor(
    private ctap:IVPService,
    private route:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params:Params) => {
          if (params['categoryId']) {
            return Observable.forkJoin(
              this.ctap.getContent(params['categoryId']),
              this.ctap.getCategories(params['categoryId']))
              .do(result => {
                this.catBased= true;
                this.categoryId = params['categoryId'];
                this.content = result[0];
                this.title = result[1].name;
              })
          } else {
            return this.ctap.getContentFromSearchedTerm(params['contentName'])
              .do(result => {
                this.catBased= false;
                this.categoryId = params['contentName'];
                this.content = result;
                this.title = params['contentName'];
              })
          }
        }
        )
      .subscribe(
        () => this.computePageSize(),
        error => this.errorMessage = <any>error
      );
  }

  computePageSize(){
    this.pageNum = Math.ceil(this.content.total/this.numberOfItemsPerPage);
    let temporaryArray = Array(this.pageNum).fill(1);
    this.pages = temporaryArray.map((x, i) => i*this.numberOfItemsPerPage);
  }

  getSource(term, page){
    if (this.catBased){
      return this.ctap.getContent(term, page);
    }else {
      return this.ctap.getContentFromSearchedTerm(term, page);
    }
  }

}
