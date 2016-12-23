import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "./navbar/search/search.component";
import {BrowseComponent} from "./navbar/browse/browse.component";
import {LolomoRowV1Component} from "./lolomo-row-v1/lolomo-row-v1.component";
import {ContentRowComponent} from "./content-row/content-row.component";
import {FullContentComponent} from "./full-content/full-content.component";
import {OverlayComponent} from "./content-row/overlay/overlay.component";
import {ContentCarouselComponent} from "./lolomo-row-v1/content-carousel/content-carousel.component";
import {BusyModule} from "angular2-busy";
import {NavbarComponent} from "./navbar/navbar.component";
import {PlayerComponent} from "./player/player.component";
import {BillboardRowComponent} from "./billboard-row/billboard-row.component";
import {ProfileLinkComponent} from "./navbar/profile-link/profile-link.component";
import {LolomoRowComponent} from "./lolomo-row/lolomo-row.component";
import {ContentRowResponsiveComponent} from "./lolomo-row/content-row-responsive/content-row-responsive.component";
import {ContentCarouselResponsiveComponent} from "./lolomo-row/content-carousel-responsive/content-carousel-responsive.component";
import { OverlayResponsiveComponent } from './lolomo-row/content-row-responsive/overlay-responsive/overlay-responsive.component';
import { JawboneComponent } from './lolomo-row/content-row-responsive/jawbone/jawbone.component';

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
    LolomoRowV1Component,
    ContentRowComponent,
    FullContentComponent,
    OverlayComponent,
    ContentCarouselComponent,
    NavbarComponent,
    BillboardRowComponent,
    ProfileLinkComponent,
    LolomoRowComponent,
    ContentRowResponsiveComponent,
    ContentCarouselResponsiveComponent,
    OverlayResponsiveComponent,
    JawboneComponent,
  ],
  exports: [
    BillboardRowComponent,
    NavbarComponent,
    PlayerComponent,
    SearchComponent,
    BrowseComponent,
    RouterModule,
    FullContentComponent,
    LolomoRowV1Component,
    ProfileLinkComponent,
    LolomoRowComponent,
    ContentRowComponent,
    JawboneComponent
  ]
})
export class InfiniteUxModule { }
