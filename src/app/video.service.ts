import { Injectable } from '@angular/core';

declare var videojs;

@Injectable()
export class VideoService {

  constructor() { }

  playVideo(videoSrc){



    let src = {
      "type": "application/x-mpegURL",
      "src": videoSrc.href
    };

    console.log("PlayVideo ",src);

    var player = videojs('video-background');
    player.src(src);
    player.play();
    console.log("videojs ",player);
  }

}
