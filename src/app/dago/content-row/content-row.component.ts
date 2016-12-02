import {Component, OnInit, Input} from "@angular/core";
import {Subscription, Observable} from "rxjs";


class ContentRow{
  content:{
    media
  }
}

@Component({
  selector: 'iux-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.css'],

})
export class ContentRowComponent implements OnInit {

  constructor() { }

  @Input() private content;
  @Input() private categoryId;
  @Input() private offset;
  @Input() private rowSize;
  @Input() private fetchOnInit = false;
  @Input() private vertical = false;
  @Input() private zoom = true;
  @Input() private contentSource:Observable<any>;

  private imageSize;
  @Input() busy: Subscription;

  private errorMessage;
  private dummyArray;

  ngOnInit() {

    this.dummyArray = new Array(this.rowSize);
    if (this.fetchOnInit){
      this.fetchContent();
    }
    this.imageSize = this.getImageSize(this.vertical);
  }

  private getImageSize(vertical){
    if (vertical){
      return {w:228,h:341};
    }else {
      return {w:255,h:144};
    }
  }

  private getPlayLink(program){
    if (!program) return "./";
    if (!program._links.playSession) return "./";

    return '/video/'+program.id;
  }

  getContentImage(index){

    if (this.content && this.content.content[index] && this.content.content[index].content.media){
      return this.content.content[index].content.media[this.vertical?5:1].url;
    }else{
      return `http://placehold.it/${this.imageSize.w}x${this.imageSize.h}/000000/ffffff?text=+`;
    }
  }

  fetchContent(){
    if (this.content.content.length >0){
      return;
    }

    return this.busy = this.contentSource
       //.do(content =>console.log("content = ",content))
      .subscribe(
        content => this.content = content,
        error => this.errorMessage = <any>error,
      );

  }

}
