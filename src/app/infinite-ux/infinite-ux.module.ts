import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "./search/search.component";
import {IUXNavbarComponent} from "./iux-navbar/iux-navbar.component";
import {IUXFooterComponent} from "./iux-footer/iux-footer.component";
import {BrowseComponent} from "./browse/browse.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    SearchComponent,
    IUXNavbarComponent,
    IUXFooterComponent,
    BrowseComponent
  ],
  exports: [
    IUXNavbarComponent,
    IUXFooterComponent,
    SearchComponent,
    BrowseComponent,
    RouterModule,
  ]
})
export class InfiniteUxModule { }
