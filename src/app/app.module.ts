import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./infinite-ux/player/player.component";
import {CtapService} from "./ctap.service";
import {StoreComponent} from "./store/store.component";
import {PeterPlaygroundComponent} from "./peter/peter-playground/peter-playground.component";
import {DagoPlaygroundComponent} from "./dago/dago-playground/dago-playground.component";
import {DagoModule} from "./dago/dago.module";
import {PeterModule} from "./peter/peter.module";
import {InfiniteUxModule} from "./infinite-ux/infinite-ux.module";
import {FullContentComponent} from "./infinite-ux/full-content/full-content.component";
import {VideoService} from "./video.service";
import {BusyModule} from "angular2-busy";
import {ProfilesGateComponent} from "./peter/profiles-gate/profiles-gate.component";
import {UsersService} from "./users.service";
import {SettingsComponent} from "./dago/settings/settings.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
  ],
  imports: [
    DagoModule,
    BusyModule,
    PeterModule,
    InfiniteUxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: "full/:categoryId", component: FullContentComponent},
      {path: "full/search/:contentName", component: FullContentComponent},
      {path: "video/:contentId", component: PlayerComponent},
      {path: "video", component: PlayerComponent},
      {path: "profiles", component: ProfilesGateComponent},
      {path: "profiles/manage", component: ProfilesGateComponent},
      {path: "peter", component: PeterPlaygroundComponent},
      {path: "dago", component: DagoPlaygroundComponent},
      {path: "settings", component: SettingsComponent},
      {path: "", component: HomeComponent},
    ]),

  ],
  providers: [
    CtapService,
    VideoService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
