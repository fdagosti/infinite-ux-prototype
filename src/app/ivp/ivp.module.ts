import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsCtapComponent} from "./settings-ctap/settings-ctap.component";
import {KeysPipe} from "./settings-ctap/keys.pipe";
import {CtapSettingsPipe} from "./settings-ctap/ctap-settings.pipe";
import {BusyModule} from "angular2-busy";
import {InfiniteUxModule} from "../infinite-ux/infinite-ux.module";

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    InfiniteUxModule
  ],
  declarations: [
    KeysPipe,
    CtapSettingsPipe,
    SettingsCtapComponent
  ],
  exports: [
    SettingsCtapComponent
  ]
})
export class IvpModule { }
