import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'iux-settings-twitch',
  templateUrl: './settings-twitch.component.html',
  styleUrls: ['./settings-twitch.component.css']
})
export class SettingsTwitchComponent implements OnInit {

  TWITCH_URL_PROD = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=s4n0z3xfgft0jxxpi2d5t93qv4lfq3&redirect_uri=http:%2F/infinite-ux.herokuapp.com/&state=toto";
  TWITCH_URL_DEV = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=q0ngm1iu66nfi4zc0cs2ncakbn8xdh&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdago%2Fsettings&state=toto";

  private code;
  private scope;
  private state;
  private error;
  private errorDescription;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params=>{
        this.error = params["error"];
        this.errorDescription = params["error_description"];
        this.code = params["code"];
        this.state = params["state"];
        this.scope = params["scope"];
        console.log("v",params);
      },
      (e)=>console.log("error",e),
      ()=>console.log("complete")

    );
  }

  connectAccount(){
  }

}
