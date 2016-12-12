import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./infinite-ux/player/player.component";
import {IVPService} from "./ivp.service";
import {StoreComponent} from "./store/store.component";
import {InfiniteUxModule} from "./infinite-ux/infinite-ux.module";
import {FullContentComponent} from "./infinite-ux/full-content/full-content.component";
import {VideoService} from "./video.service";
import {BusyModule} from "angular2-busy";
import {UsersService} from "./users.service";
import {DebugService} from "./dago/debug.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
  ],
  imports: [
    BusyModule,
    InfiniteUxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: "full/:categoryId", component: FullContentComponent},
      {path: "full/search/:contentName", component: FullContentComponent},
      {path: "video/:contentId", component: PlayerComponent},
      {path: "video", component: PlayerComponent},
      {path: "peter", loadChildren: "app/peter/peter.module"},
      {path: "dago", loadChildren: "app/dago/dago.module"},
      {path: "", component: HomeComponent},
    ]),

  ],
  providers: [
    IVPService,
    VideoService,
    UsersService,
    DebugService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
