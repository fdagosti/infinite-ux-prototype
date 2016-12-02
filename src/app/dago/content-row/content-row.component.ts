import {Component, OnInit, Input} from "@angular/core";
import {Subscription, Observable} from "rxjs";


class ContentRow{
  content:{
    media
  }
}

const PORTRAIT_SIZE = {w:213,h:318};
const LANDSCAPE_SIZE = {w:399,h:225};

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
  @Input() private portrait = false;
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
    this.imageSize = this.getImageSize(this.portrait);
  }

  private getImageSize(portrait){
    if (portrait){
      return PORTRAIT_SIZE;
    }else {
      return LANDSCAPE_SIZE;
    }
  }

  private getPlayLink(program){
    if (!program) return "./";
    if (!program._links.playSession) return "./";

    return '/video/'+program.id;
  }

  getContentImage(index){

    if (this.content && this.content.content[index] && this.content.content[index].content.media){
      return this.content.content[index].content.media[this.portrait?5:1].url;
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
