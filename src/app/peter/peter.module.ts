import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Lolomo2Component} from "./lolomo2/lolomo2.component";
import {PeterPlaygroundComponent} from "./peter-playground/peter-playground.component";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import { NavbarPeterComponent } from './navbar-peter/navbar-peter.component';
import { BillboardRowComponent } from './billboard-row/billboard-row.component';
import { SignupBasicHeaderComponent } from './signup-basic-header/signup-basic-header.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';

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
	SignupBasicHeaderComponent,
	HomeWrapperComponent,
	]
})
export class PeterModule { }
