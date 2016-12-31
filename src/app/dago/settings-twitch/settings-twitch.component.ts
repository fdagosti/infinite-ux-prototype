import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TwitchService} from "../../twitch.service";

@Component({
  selector: 'iux-settings-twitch',
  templateUrl: './settings-twitch.component.html',
  styleUrls: ['./settings-twitch.component.css']
})
export class
SettingsTwitchComponent implements OnInit {

  private code;
  private scope;
  private state;
  private error;
  private errorDescription;

  constructor(private route:ActivatedRoute, private twitch:TwitchService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params=>{
        this.error = params["error"];
        this.errorDescription = params["error_description"];
        this.code = params["code"];
        this.state = params["state"];
        this.scope = params["scope"];
        if (this.code){
          this.twitch.setConnectStatus(this.code);
        }
        console.log("v",params);
      },
      (e)=>console.log("error",e),
      ()=>console.log("complete")

    );
  }

  connectAccount(){
    this.twitch.connectAccount();
  }

}
