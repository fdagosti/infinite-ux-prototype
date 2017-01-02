import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./infinite-ux/player/player.component";
import {IVPService} from "./ivp.service";
import {LolomoComponent} from "./infinite-ux/lolomo/lolomo.component";
import {InfiniteUxModule} from "./infinite-ux/infinite-ux.module";
import {FullContentComponent} from "./infinite-ux/full-content/full-content.component";
import {VideoService} from "./video.service";
import {BusyModule} from "angular2-busy";
import {UsersService} from "./users.service";
import {DebugService} from "./debug.service";
import {HomeService} from "./home.service";
import {TwitchService} from "./twitch.service";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsDebugComponent} from "./settings-debug/settings-debug.component";
import {SettingsTwitchComponent} from "./settings-twitch/settings-twitch.component";
import {SettingsCtapComponent} from "./settings-ctap/settings-ctap.component";
import {FormsModule} from "@angular/forms";
import {KeysPipe} from "./keys.pipe";
import {CtapSettingsPipe} from "./settings-ctap/ctap-settings.pipe";
import {FullContentService} from "./full-content.service";


@NgModule({
  declarations: [
    KeysPipe,
    CtapSettingsPipe,
    AppComponent,
    HomeComponent,
    SettingsComponent,
    SettingsDebugComponent,
    SettingsTwitchComponent,
    SettingsCtapComponent
  ],
  imports: [
    BusyModule,
    FormsModule,
    InfiniteUxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: "full/:categoryId", component: FullContentComponent},
      {path: "full/search/:contentName", component: FullContentComponent},
      {path: "video/:contentId", component: PlayerComponent},
      {path: "video", component: PlayerComponent},
      {path: "peter", loadChildren: "app/peter/peter.module"},
      {path: "dago", loadChildren: "app/dago/dago.module"},
      {path: "settings", component: SettingsComponent},
      {path: "", component: HomeComponent},
    ]),

  ],
  providers: [
    IVPService,
    VideoService,
    UsersService,
    DebugService,
    TwitchService,
    HomeService,
    FullContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
