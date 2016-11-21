import {Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import {ContentRowComponent} from "../content-row/content-row.component";
import {CtapService} from "../../ctap.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';


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

  private errorMessage;

  @Input() private numberOfItemsPerPage = 6;


  @ViewChildren(ContentRowComponent) rows : QueryList<ContentRowComponent>;

  constructor(
    private ctap:CtapService,
    private route:ActivatedRoute,
    private router:Router
  ) { }



  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => {
      this.categoryId = params['categoryId'];
      return this.ctap.getContent(this.categoryId);
    })
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


}
