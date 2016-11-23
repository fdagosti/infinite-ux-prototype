import { Injectable } from '@angular/core';

declare var videojs;

@Injectable()
export class VideoService {

  constructor() { }

  playVideo(videoSrc){

    const PROXY = "https://cisco-itk-proxy.herokuapp.com/";

    let src = {
      "type": "application/x-mpegURL",
      "src": PROXY+videoSrc
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
