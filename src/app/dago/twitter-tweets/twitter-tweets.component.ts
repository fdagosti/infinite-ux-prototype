import { Component, OnInit } from '@angular/core';
import {TwitterService} from "../../twitter.service";
import {Subject} from "rxjs";

@Component({
  selector: 'iux-twitter-tweets',
  templateUrl: './twitter-tweets.component.html',
  styleUrls: ['./twitter-tweets.component.css']
})
export class TwitterTweetsComponent implements OnInit {
  private result;
  toutou=new Subject();
  constructor(private twitter: TwitterService) { }

  ngOnInit() {
  }

  search(query){
    console.log("query");

  }

}
