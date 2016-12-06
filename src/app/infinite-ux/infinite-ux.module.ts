import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "./navbar/search/search.component";
import {BrowseComponent} from "./navbar/browse/browse.component";
import {LolomoComponent} from "./lolomo/lolomo.component";
import {ContentRowComponent} from "./content-row/content-row.component";
import {FullContentComponent} from "./full-content/full-content.component";
import {OverlayComponent} from "./content-row/overlay/overlay.component";
import {ContentCarouselComponent} from "./lolomo/content-carousel/content-carousel.component";
import {BusyModule} from "angular2-busy";
import {NavbarComponent} from "./navbar/navbar.component";
import {PlayerComponent} from "./player/player.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NgbModule.forRoot(),
    BusyModule
  ],
  declarations: [
    SearchComponent,
    PlayerComponent,
    BrowseComponent,
    LolomoComponent,
    ContentRowComponent,
    FullContentComponent,
    OverlayComponent,
    ContentCarouselComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    PlayerComponent,
    SearchComponent,
    BrowseComponent,
    RouterModule,
    FullContentComponent,
    ContentRowComponent,
    LolomoComponent
  ]
})
export class InfiniteUxModule { }
