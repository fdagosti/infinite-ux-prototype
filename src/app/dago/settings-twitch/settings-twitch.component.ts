import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iux-settings-twitch',
  templateUrl: './settings-twitch.component.html',
  styleUrls: ['./settings-twitch.component.css']
})
export class SettingsTwitchComponent implements OnInit {

  TWITCH_URL = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=s4n0z3xfgft0jxxpi2d5t93qv4lfq3&redirect_uri=http:%2F/infinite-ux.herokuapp.com/&state=toto";

  constructor() { }

  ngOnInit() {
  }

  connectAccount(){
    window.location = this.TWITCH_URL;
  }

}
