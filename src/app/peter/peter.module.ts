import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Lolomo2Component} from "./lolomo2/lolomo2.component";
import {PeterPlaygroundComponent} from "./peter-playground/peter-playground.component";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";
import {BillboardRowComponent} from "../infinite-ux/billboard-row/billboard-row.component";
import {SignupBasicHeaderComponent} from "./signup-basic-header/signup-basic-header.component";
import {HomeWrapperComponent} from "./home-wrapper/home-wrapper.component";
import {ProfilesGateComponent} from "./profiles-gate/profiles-gate.component";
import {ProfilesActionContainerComponent} from "./profiles-action-container/profiles-action-container.component";
import {ListProfilesComponent} from "./list-profiles/list-profiles.component";
import {ManageProfileButtonComponent} from "./manage-profile-button/manage-profile-button.component";
import {ProfileLinkComponent} from "./profile-link/profile-link.component";

@NgModule({
	imports: [
	CommonModule,
	InfiniteUxModule
	],
	declarations: [
	PeterPlaygroundComponent,
	Lolomo2Component,
	BillboardRowComponent,
	SignupBasicHeaderComponent,
	HomeWrapperComponent,
	ProfilesGateComponent,
	ProfilesActionContainerComponent,
	ListProfilesComponent,
	ManageProfileButtonComponent,
	ProfileLinkComponent,
	],
  exports: [
    BillboardRowComponent,
    ProfilesGateComponent
  ]
})
export class PeterModule { }
