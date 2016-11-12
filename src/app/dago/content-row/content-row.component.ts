import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../../ctap.service";


@Component({
  selector: 'iux-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.css']
})
export class ContentRowComponent implements OnInit {

  constructor(private ctap:CtapService) { }

  @Input() private content;
  @Input() private category;
  @Input() private offset;
  @Input() private rowSize;

  private errorMessage;
  private dummyArray;

  ngOnInit() {
    this.dummyArray = new Array(this.rowSize);
  }

  fetchContent(){

    if (this.content.content.length >0){
      return;
    }

    this.ctap.getContent(this.category, this.offset)
      .subscribe(
        content => {
          this.content = content;
        },
        error => this.errorMessage = <any>error
      );

  }

}
