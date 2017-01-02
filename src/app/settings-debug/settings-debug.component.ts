import { Component, OnInit } from '@angular/core';
import {DebugService} from "../debug.service";

@Component({
  selector: 'iux-settings-debug',
  templateUrl: 'settings-debug.component.html',
  styleUrls: ['settings-debug.component.css']
})
export class SettingsDebugComponent implements OnInit {

  private proxyEnabled;

  constructor(private debug:DebugService) {
    this.proxyEnabled = debug.isProxyEnabled();
  }

  enableProxy(b){
    console.log("update service ",b);

    this.proxyEnabled = this.debug.enableProxy(b);
  }

  ngOnInit() {
  }

}
