import { Injectable } from '@angular/core';

declare var videojs;

@Injectable()
export class VideojsService {

  constructor() { }

  playVideo(videoSrc){

    let src = {
      "type": "application/x-mpegURL",
      "src": videoSrc
    };

    var player = videojs('video-background');
    player.src(src);
    player.play();
  }

  stopVideo(){
    var player = videojs('video-background');
    player.dispose();
  }

}
