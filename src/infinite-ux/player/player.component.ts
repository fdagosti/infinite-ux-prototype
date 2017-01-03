import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {VideoService} from "./video.service";
import {VideojsService} from "./videojs.service";


@Component({
  selector: 'iux-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css'],
  providers: [VideojsService]
})
export class PlayerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.videojs.stopVideo();
  }

  private fakeVideo = "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8";

  constructor(
    private route:ActivatedRoute,
    private video:VideoService,
    private videojs:VideojsService,
    private location: Location
  ) {}



  ngOnInit() {

    const video$ = Observable.merge(
      this.route.params
        .filter((params:Params) => params['contentId'] != null)
        .switchMap((params:Params) => this.video.getPlayUrl(params['contentId'])),
      this.route.params
        .filter((params:Params) => params['contentId'] == null)
        .map(content => this.fakeVideo)
    );

    video$
      .subscribe(
        content => this.videojs.playVideo(content),
        error => console.log("ERROR ",error)
      );


  }

}
