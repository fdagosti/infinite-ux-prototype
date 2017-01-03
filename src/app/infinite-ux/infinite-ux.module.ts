import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "./navbar/search/search.component";
import {BrowseComponent} from "./navbar/browse/browse.component";
import {FullContentComponent} from "./full-content/full-content.component";
import {BusyModule} from "angular2-busy";
import {NavbarComponent} from "./navbar/navbar.component";
import {PlayerComponent} from "./player/player.component";
import {BillboardRowComponent} from "./billboard-row/billboard-row.component";
import {ProfileLinkComponent} from "./navbar/profile-link/profile-link.component";
import {LolomoRowComponent} from "./lolomo/lolomo-row/lolomo-row.component";
import {ContentRowResponsiveComponent} from "./content-row-responsive/content-row-responsive.component";
import {ContentCarouselResponsiveComponent} from "./lolomo/lolomo-row/content-carousel-responsive/content-carousel-responsive.component";
import { OverlayResponsiveComponent } from './content-row-responsive/overlay-responsive/overlay-responsive.component';
import { JawboneComponent } from './content-row-responsive/jawbone/jawbone.component';
import { LolomoComponent } from './lolomo/lolomo.component';
import { TabOverviewComponent } from './content-row-responsive/jawbone/tab-overview/tab-overview.component';
import { TabMoreLikeThisComponent } from './content-row-responsive/jawbone/tab-more-like-this/tab-more-like-this.component';
import { TabShowDetailsComponent } from './content-row-responsive/jawbone/tab-show-details/tab-show-details.component';
import { MetaComponent } from './meta/meta.component';
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import { ProgressComponent } from './content-row-responsive/progress/progress.component';
import {SettingsSectionComponent} from "./settings/settings-section/settings-section.component";
import {CacheService} from "./lolomo/lolomo-row/content-carousel-responsive/cache.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NgbModule.forRoot(),
    BusyModule,
    InfiniteScrollModule
  ],
  declarations: [
    SearchComponent,
    PlayerComponent,
    BrowseComponent,
    FullContentComponent,
    NavbarComponent,
    BillboardRowComponent,
    ProfileLinkComponent,
    LolomoRowComponent,
    ContentRowResponsiveComponent,
    ContentCarouselResponsiveComponent,
    OverlayResponsiveComponent,
    JawboneComponent,
    LolomoComponent,
    TabOverviewComponent,
    TabMoreLikeThisComponent,
    TabShowDetailsComponent,
    MetaComponent,
    ProgressComponent,
    SettingsSectionComponent
  ],
  exports: [
    BillboardRowComponent,
    NavbarComponent,
    PlayerComponent,
    RouterModule,
    FullContentComponent,
    ProfileLinkComponent,
    LolomoComponent,
    SettingsSectionComponent
  ],
  providers: [
    CacheService
  ]
})
export class InfiniteUxModule { }
