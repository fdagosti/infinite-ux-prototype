import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsTwitchComponent} from "./settings-twitch/settings-twitch.component";
import {BusyModule} from "angular2-busy";
import {InfiniteUxModule} from "../../infinite-ux/infinite-ux.module";

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    InfiniteUxModule
  ],
  declarations: [
    SettingsTwitchComponent
  ],
  exports: [
    SettingsTwitchComponent
  ]
})
export class TwitchModule { }
