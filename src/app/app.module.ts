import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "../infinite-ux/player/player.component";
import {IVPService} from "./ivp/ivp.service";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import {VideoService} from "../infinite-ux/player/video.service";
import {BusyModule} from "angular2-busy";
import {UsersService} from "../infinite-ux/player/users.service";
import {DebugService} from "./debug.service";
import {TwitchService} from "./twitch/twitch.service";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsDebugComponent} from "./settings/settings-debug/settings-debug.component";
import {FormsModule} from "@angular/forms";
import {FullContentService} from "../infinite-ux/full-content/full-content.service";
import {MyCustomFullContentComponent} from "./my-custom-full-content/my-custom-full-content.component";
import {TwitchModule} from "./twitch/twitch.module";
import {IvpModule} from "./ivp/ivp.module";
import {BrowseService} from "../infinite-ux/navbar/browse/browse.service";
import {GlobalAppService} from "./global-app.service";
import {SearchService} from "../infinite-ux/navbar/search/search.service";


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
    {provide:BrowseService, useClass: GlobalAppService},
    {provide:SearchService, useClass: GlobalAppService},
    {provide:VideoService, useClass: GlobalAppService},
    IVPService,
    UsersService,
    DebugService,
    TwitchService,
    FullContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
