import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ContentCarouselComponent} from "./content-carousel/content-carousel.component";
import {PrimeTimeComponent} from "./prime-time/prime-time.component";
import {SpyDirective} from "./spy.directive";
import {DagoPlaygroundComponent} from "./dago-playground/dago-playground.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import {ContentRowComponent} from "./content-row/content-row.component";
import {IUXContentListSmComponent} from "./iux-content-list-sm/iux-content-list-sm.component";
import {FullContentComponent} from "./full-content/full-content.component";
import {PeterModule} from "../peter/peter.module";
import {BusyModule} from "angular2-busy";
import {TwitterService} from "../twitter.service";
import {TwitterTweetsComponent} from "./twitter-tweets/twitter-tweets.component";
import { SettingsComponent } from './settings/settings.component';
import { SettingsSectionComponent } from './settings-section/settings-section.component';
import {CtapSettingsPipe} from "./ctap-settings.pipe";
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InfiniteUxModule,
    PeterModule,
    BusyModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ContentCarouselComponent,
    PrimeTimeComponent,
    SpyDirective,
    DagoPlaygroundComponent,
    ContentRowComponent,
    IUXContentListSmComponent,
    FullContentComponent,
    TwitterTweetsComponent,
    SettingsComponent,
    SettingsSectionComponent,
    CtapSettingsPipe,
    KeysPipe
  ],
  exports: [
    SettingsComponent,
    DagoPlaygroundComponent,
    IUXContentListSmComponent
  ],
  providers: [
    TwitterService
  ]
})
export class DagoModule { }
