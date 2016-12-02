import {Component, OnInit} from "@angular/core";
import {TwitterService} from "../../twitter.service";
import {Subject, Observable} from "rxjs";
import {switchMap} from "rxjs/operator/switchMap";

@Component({
  selector: 'iux-twitter-tweets',
  templateUrl: './twitter-tweets.component.html',
  styleUrls: ['./twitter-tweets.component.css']
})
export class TwitterTweetsComponent implements OnInit {

  private toutou = new Subject();

  private queries = [0];

  private tweet$ = Observable.empty();
  constructor(private twitter: TwitterService) {
    this.toutou
      .do(value=>console.log("value",value))
      .subscribe(
        value => this.tweet$ = this.twitter.getContent(value, 0)
      )

  }

  ngOnInit() {
  }

  search(query){
    console.log("query");

  }

}
