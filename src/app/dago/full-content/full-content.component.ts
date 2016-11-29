import {Component, OnInit, Input} from "@angular/core";
import {CtapService, Category} from "../../ctap.service";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs";


@Component({
  selector: 'iux-full-content',
  templateUrl: './full-content.component.html',
  styleUrls: ['./full-content.component.css']
})
export class FullContentComponent implements OnInit {

  private content;
  private pageNum=0;
  private pages=Array(1);
  private categoryId;
  private category:Category=new Category();

  private errorMessage;

  @Input() private numberOfItemsPerPage = 6;


  constructor(
    private ctap:CtapService,
    private route:ActivatedRoute,
  ) { }



  ngOnInit() {

    this.route.params
      .do((params:Params) => this.categoryId = params['categoryId'])
      .switchMap((params: Params) => Observable.forkJoin(
        this.ctap.getContent(this.categoryId),
        this.ctap.getCategories(this.categoryId)))
      .subscribe(
        result => {
          this.content = result[0];
          this.category = result[1];
          this.computePageSize();
        },
        error => this.errorMessage = <any>error
      );
  }

  computePageSize(){
    this.pageNum = Math.ceil(this.content.total/this.numberOfItemsPerPage);
    let temporaryArray = Array(this.pageNum).fill(1);
    this.pages = temporaryArray.map((x, i) => i*this.numberOfItemsPerPage);
  }


}
