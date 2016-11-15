import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Lolomo2Component} from "./lolomo2/lolomo2.component";
import {PeterPlaygroundComponent} from "./peter-playground/peter-playground.component";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import { NavbarPeterComponent } from './navbar-peter/navbar-peter.component';
import { BillboardRowComponent } from './billboard-row/billboard-row.component';

@NgModule({
	imports: [
	CommonModule,
	InfiniteUxModule
	],
	declarations: [
	PeterPlaygroundComponent,
	Lolomo2Component,
	NavbarPeterComponent,
	BillboardRowComponent,
	]
})
export class PeterModule { }
