import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PresentationComponent} from "./presentation/presentation.component";
import {PlayerComponent} from "./player/player.component";
import {CtapService} from "./ctap.service";
import {StoreComponent} from "./store/store.component";
import {AuthenticationService} from "./authentication.service";
import {PeterPlaygroundComponent} from "./peter/peter-playground/peter-playground.component";
import {DagoPlaygroundComponent} from "./dago/dago-playground/dago-playground.component";
import {DagoModule} from "./dago/dago.module";
import {PeterModule} from "./peter/peter.module";
import {InfiniteUxModule} from "./infinite-ux/infinite-ux.module";
import {FullContentComponent} from "./dago/full-content/full-content.component";
import {VideoService} from "./video.service";
import {BusyModule} from "angular2-busy";
import {ProfilesGateComponent} from "./peter/profiles-gate/profiles-gate.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PresentationComponent,
    PlayerComponent,
    StoreComponent,
  ],
  imports: [
    DagoModule,
    BusyModule,
    PeterModule,
    InfiniteUxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: "presentation", component: PresentationComponent},
      {path: "full/:categoryId", component: FullContentComponent},
      {path: "video/:contentId", component: PlayerComponent},
      {path: "video", component: PlayerComponent},
      {path: "profiles", component: ProfilesGateComponent},
      {path: "profiles/manage", component: ProfilesGateComponent},
      {path: "peter", component: PeterPlaygroundComponent},
      {path: "dago", component: DagoPlaygroundComponent},
      {path: "", component: HomeComponent},
    ]),

  ],
  providers: [
    CtapService,
    VideoService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
