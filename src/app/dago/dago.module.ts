import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SpyDirective} from "./spy.directive";
import {DagoPlaygroundComponent} from "./dago-playground/dago-playground.component";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import {TwitterService} from "./twitter.service";
import {TwitterTweetsComponent} from "./twitter-tweets/twitter-tweets.component";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsSectionComponent} from "./settings/settings-section/settings-section.component";
import {CtapSettingsPipe} from "./settings-ctap/ctap-settings.pipe";
import {KeysPipe} from "./keys.pipe";
import {SettingsCtapComponent} from "./settings-ctap/settings-ctap.component";
import {SettingsDebugComponent} from "./settings-debug/settings-debug.component";
import {SettingsAdsuiteComponent} from "./settings-adsuite/settings-adsuite.component";
import {BusyModule} from "angular2-busy";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InfiniteUxModule,
    BusyModule
  ],
  declarations: [
    SpyDirective,
    DagoPlaygroundComponent,
    TwitterTweetsComponent,
    SettingsComponent,
    SettingsSectionComponent,
    CtapSettingsPipe,
    KeysPipe,
    SettingsCtapComponent,
    SettingsDebugComponent,
    SettingsAdsuiteComponent,
  ],
  exports: [
    SettingsComponent,
    DagoPlaygroundComponent,
  ],
  providers: [
    TwitterService
  ]
})
export class DagoModule { }
