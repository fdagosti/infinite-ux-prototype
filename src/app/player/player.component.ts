import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CtapService} from "../ctap.service";
import {VideoService} from "../video.service";

@Component({
  selector: 'iux-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private ctap:CtapService,
    private video:VideoService
  ) { }

  private contentId;

  ngOnInit() {
    this.route.params
      .do((params:Params) => this.contentId = params['contentId'])
      .switchMap((params:Params) => this.ctap.getPlaySession(params['contentId']))
      .do(content => this.video.playVideo(content._links.playUrl))
      .subscribe(
        content => console.log("params ",content),

        error => console.log("ERROR ",error)
      );


  }

}
