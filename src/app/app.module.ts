import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {PrimeTimeComponent} from "./prime-time/prime-time.component";
import {IUXNavbarComponent} from "./iux-navbar/iux-navbar.component";
import {IUXContentListLgComponent} from "./iux-content-list-lg/iux-content-list-lg.component";
import {IUXFooterComponent} from "./iux-footer/iux-footer.component";
import {IUXContentListSmComponent} from "./iux-content-list-sm/iux-content-list-sm.component";
import {HomeComponent} from "./home/home.component";
import {PresentationComponent} from "./presentation/presentation.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PrimeTimeComponent,
    IUXNavbarComponent,
    IUXContentListLgComponent,
    IUXFooterComponent,
    IUXContentListSmComponent,
    HomeComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: "presentation", component: PresentationComponent},
      {path: "", component: HomeComponent},
    ]),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
