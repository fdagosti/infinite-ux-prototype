import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ContentCarouselComponent, IuxSlide} from "./content-carousel/content-carousel.component";
import {PrimeTimeComponent} from "./prime-time/prime-time.component";
import {IUXContentListLgComponent} from "./iux-content-list-lg/iux-content-list-lg.component";
import {IUXContentListSmComponent} from "./iux-content-list-sm/iux-content-list-sm.component";
import {SpyDirective} from "./spy.directive";
import {DagoPlaygroundComponent} from "./dago-playground/dago-playground.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InfiniteUxModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ContentCarouselComponent,
    IuxSlide,
    PrimeTimeComponent,
    IUXContentListLgComponent,
    IUXContentListSmComponent,
    SpyDirective,
    DagoPlaygroundComponent
  ],
  exports: [
    PrimeTimeComponent,
    DagoPlaygroundComponent,
    IUXContentListSmComponent
  ]
})
export class DagoModule { }
