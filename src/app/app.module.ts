import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PakouCmpComponent } from './pakou-cmp/pakou-cmp.component';
import { PrimeTimeComponent } from './prime-time/prime-time.component';
import { IUXNavbarComponent } from './iux-navbar/iux-navbar.component';
import { IUXContentListSmComponent } from './iux-content-list-sm/iux-content-list-sm.component';
import { IUXContentListLgComponent } from './iux-content-list-lg/iux-content-list-lg.component';
import { IUXFooterComponent } from './iux-footer/iux-footer.component';
import { IUXContentListSm2Component } from './iux-content-list-sm-2/iux-content-list-sm-2.component';

@NgModule({
  declarations: [
    AppComponent,
    PakouCmpComponent,
    PrimeTimeComponent,
    IUXNavbarComponent,
    IUXContentListSmComponent,
    IUXContentListLgComponent,
    IUXFooterComponent,
    IUXContentListSm2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
