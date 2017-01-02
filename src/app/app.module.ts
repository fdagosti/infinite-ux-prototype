import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./infinite-ux/player/player.component";
import {IVPService} from "./ivp/ivp.service";
import {LolomoComponent} from "./infinite-ux/lolomo/lolomo.component";
import {InfiniteUxModule} from "./infinite-ux/infinite-ux.module";
import {FullContentComponent} from "./infinite-ux/full-content/full-content.component";
import {VideoService} from "./video.service";
import {BusyModule} from "angular2-busy";
import {UsersService} from "./users.service";
import {DebugService} from "./debug.service";
import {HomeService} from "./home/home.service";
import {TwitchService} from "./twitch/twitch.service";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsDebugComponent} from "./settings/settings-debug/settings-debug.component";
import {SettingsTwitchComponent} from "./twitch/settings-twitch/settings-twitch.component";
import {SettingsCtapComponent} from "./ivp/settings-ctap/settings-ctap.component";
import {FormsModule} from "@angular/forms";
import {KeysPipe} from "./ivp/settings-ctap/keys.pipe";
import {CtapSettingsPipe} from "./ivp/settings-ctap/ctap-settings.pipe";
import {FullContentService} from "./infinite-ux/full-content/full-content.service";
import {LolomoService} from "./infinite-ux/lolomo/lolomo.service";
import { MyCustomFullContentComponent } from './my-custom-full-content/my-custom-full-content.component';
import {TwitchModule} from "./twitch/twitch.module";
import {IvpModule} from "./ivp/ivp.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    SettingsDebugComponent,
    MyCustomFullContentComponent
  ],
  imports: [
    BusyModule,
    IvpModule,
    TwitchModule,
    FormsModule,
    InfiniteUxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: "full/:categoryId", component: MyCustomFullContentComponent},
      {path: "full/search/:contentName", component: MyCustomFullContentComponent},
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
    FullContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
