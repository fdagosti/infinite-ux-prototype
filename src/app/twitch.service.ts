import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions} from "@angular/http";

@Injectable()
export class TwitchService {

  TWITCH_URL_PROD = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=s4n0z3xfgft0jxxpi2d5t93qv4lfq3&redirect_uri=http:%2F/infinite-ux.herokuapp.com/&state=toto";
  TWITCH_URL_DEV = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=q0ngm1iu66nfi4zc0cs2ncakbn8xdh&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdago%2Fsettings&state=toto";

  constructor(private http:Http) { }

  public connectAccount(){
    window.location.href = this.TWITCH_URL_DEV;
  }

  public setConnectStatus(code){
    let params = new URLSearchParams();
    params.set('code', code); // the user's search value

    let options = new RequestOptions({
      search: params
    });

    return this.http.post("/api/login_twitch", null, options).subscribe(
      v=>console.log("login result",v),
      e=>console.log("error",e),
      ()=>console.log("DONE")
    )
  }



}
