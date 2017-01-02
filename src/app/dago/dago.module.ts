import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SpyDirective} from "./spy.directive";
import {DagoPlaygroundComponent} from "./dago-playground/dago-playground.component";
import {TwitterService} from "./twitter.service";
import {TwitterTweetsComponent} from "./twitter-tweets/twitter-tweets.component";
import {SettingsAdsuiteComponent} from "./settings-adsuite/settings-adsuite.component";
import {BusyModule} from "angular2-busy";
import {RouterModule} from "@angular/router";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InfiniteUxModule,
    BusyModule,
    RouterModule.forChild([
      {path : "", component: DagoPlaygroundComponent},
    ])
  ],
  declarations: [
    SpyDirective,
    DagoPlaygroundComponent,
    TwitterTweetsComponent,
    SettingsAdsuiteComponent,
  ],
  exports: [
  ],
  providers: [
    TwitterService
  ]
})
export default class DagoModule { }
