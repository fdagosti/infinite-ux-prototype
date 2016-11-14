import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Lolomo2Component} from "./lolomo2/lolomo2.component";
import {PeterPlaygroundComponent} from "./peter-playground/peter-playground.component";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";

@NgModule({
  imports: [
    CommonModule,
    InfiniteUxModule
  ],
  declarations: [
    PeterPlaygroundComponent,
    Lolomo2Component,
  ]
})
export class PeterModule { }
