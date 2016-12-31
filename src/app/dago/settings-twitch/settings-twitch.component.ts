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

  private scope;
  private state;
  private error;
  private errorDescription;
  private twitchAccountConnected = false;
  private loginInProgress=null;

  constructor(private route:ActivatedRoute, private twitch:TwitchService) { }

  ngOnInit() {

    this.readQueryParameters();
    this.updateConnectionStatus();

  }

  private readQueryParameters(){
    this.route.queryParams.subscribe(
      params=>{
        this.error = params["error"];
        this.errorDescription = params["error_description"];
        this.state = params["state"];
        this.scope = params["scope"];
        if (params["code"]){
          this.login(params["code"]);
        }
      },
      e=>console.log("error",e),
      ()=>console.log("complete")
    );
  }

  private updateConnectionStatus(){
    this.twitchAccountConnected = this.twitch.isTwitchConnected();
  }

  private login(code){
    this.loginInProgress = this.twitch.login(code).subscribe(
      ()=>{this.updateConnectionStatus()},
      e=>this.loginInProgress=null,
      ()=>this.loginInProgress=null
    );
  }

  disconnectAccount(){
    this.twitch.disconnectAccount();
    this.updateConnectionStatus();
  }

  connectAccount(){
    this.twitch.connectAccount();
  }
}
