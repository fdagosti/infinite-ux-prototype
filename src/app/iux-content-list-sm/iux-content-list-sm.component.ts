import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../ctap.service";

@Component({
  selector: 'iux-content-list-sm',
  templateUrl: 'iux-content-list-sm.component.html',
  styleUrls: ['iux-content-list-sm.component.css']
})
export class IUXContentListSmComponent implements OnInit {

  @Input() index;
  @Input() category = {name:"toto",id:0};
  private content;
  private pageNum;
  private pages;

  private errorMessage;

  constructor(public ctap:CtapService) { }

  ngOnInit() {
    this.ctap.getContent(this.category)
      .subscribe(
        content => {
          this.content = content;
          this.pageNum = Math.ceil(this.content.total/6);
          this.pages = Array(this.pageNum);
          for (let i = 0; i < this.pages.length;i++){
            this.pages[i] = i*6;
          }
        },
        error => this.errorMessage = <any>error
      );
  }

}
