import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SpyDirective} from "./spy.directive";
import {DagoPlaygroundComponent} from "./dago-playground/dago-playground.component";
import {TwitterService} from "./twitter.service";
import {TwitterTweetsComponent} from "./twitter-tweets/twitter-tweets.component";
import {SettingsComponent} from "./settings/settings.component";
import {CtapSettingsPipe} from "./settings-ctap/ctap-settings.pipe";
import {KeysPipe} from "./keys.pipe";
import {SettingsCtapComponent} from "./settings-ctap/settings-ctap.component";
import {SettingsDebugComponent} from "./settings-debug/settings-debug.component";
import {SettingsAdsuiteComponent} from "./settings-adsuite/settings-adsuite.component";
import {BusyModule} from "angular2-busy";
import {RouterModule} from "@angular/router";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import { SettingsTwitchComponent } from './settings-twitch/settings-twitch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InfiniteUxModule,
    BusyModule,
    RouterModule.forChild([
      {path : "", component: DagoPlaygroundComponent},
      {path: "settings", component: SettingsComponent},
    ])
  ],
  declarations: [
    SpyDirective,
    DagoPlaygroundComponent,
    TwitterTweetsComponent,
    SettingsComponent,
    CtapSettingsPipe,
    KeysPipe,
    SettingsCtapComponent,
    SettingsDebugComponent,
    SettingsAdsuiteComponent,
    SettingsTwitchComponent,
  ],
  exports: [
  ],
  providers: [
    TwitterService
  ]
})
export default class DagoModule { }
