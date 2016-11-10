import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {PrimeTimeComponent} from "./prime-time/prime-time.component";
import {IUXNavbarComponent} from "./iux-navbar/iux-navbar.component";
import {Lolomo2Component} from "./lolomo2/lolomo2.component";
import {IUXContentListLgComponent} from "./iux-content-list-lg/iux-content-list-lg.component";
import {IUXFooterComponent} from "./iux-footer/iux-footer.component";
import {IUXContentListSmComponent} from "./iux-content-list-sm/iux-content-list-sm.component";
import {HomeComponent} from "./home/home.component";
import {PresentationComponent} from "./presentation/presentation.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SpyDirective} from "./spy.directive";
import {BrowseComponent} from "./browse/browse.component";
import {PlayerComponent} from "./player/player.component";
import {ContentCarouselComponent, IuxSlide} from "./content-carousel/content-carousel.component";
import {CtapService} from "./ctap.service";
import {StoreComponent} from "./store/store.component";
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import {AuthenticationService} from "./authentication.service";
import { PeterPlaygroundComponent } from './peter-playground/peter-playground.component';
import { DagoPlaygroundComponent } from './dago-playground/dago-playground.component';

@NgModule({
  declarations: [
    ContentCarouselComponent,
    IuxSlide,
    AppComponent,
    PrimeTimeComponent,
    IUXNavbarComponent,
    Lolomo2Component,
    IUXContentListLgComponent,
    IUXFooterComponent,
    IUXContentListSmComponent,
    HomeComponent,
    PresentationComponent,
    SpyDirective,
    BrowseComponent,
    PlayerComponent,
    StoreComponent,
    LoginComponent,
    SearchComponent,
    PeterPlaygroundComponent,
    DagoPlaygroundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: "presentation", component: PresentationComponent},
      {path: "video", component: PlayerComponent},
      {path: "peter", component: PeterPlaygroundComponent},
      {path: "dago", component: DagoPlaygroundComponent},
      {path: "", component: HomeComponent},
    ]),
    NgbModule.forRoot()
  ],
  providers: [
    CtapService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
