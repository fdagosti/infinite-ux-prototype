import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CtapService} from "../ctap.service";
import {VideoService} from "../video.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'iux-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.video.stopVideo();
  }

  private fakeVideo = "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8";

  constructor(
    private route:ActivatedRoute,
    private ctap:CtapService,
    private video:VideoService
  ) { }

  ngOnInit() {

    const video$ = Observable.merge(
      this.route.params
        .filter((params:Params) => params['contentId'] != null)
        .switchMap((params:Params) => this.ctap.getPlaySession(params['contentId']))
          .map((content:any) => content._links.playUrl.href),
      this.route.params
        .filter((params:Params) => params['contentId'] == null)
        .map(content => this.fakeVideo)
    );

    video$
      .subscribe(
        content => this.video.playVideo(content),
        error => console.log("ERROR ",error)
      );


  }

}
