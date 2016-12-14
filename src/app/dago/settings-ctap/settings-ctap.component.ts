import { Component, OnInit } from '@angular/core';
import {IVPService} from "../../ivp.service";

@Component({
  selector: 'iux-settings-ctap',
  templateUrl: './settings-ctap.component.html',
  styleUrls: ['./settings-ctap.component.css']
})
export class SettingsCtapComponent implements OnInit {

  constructor(private ctap:IVPService) { }

  private busy;
  private data;

  ngOnInit() {
    this.busy = this.ctap.getSettings()
      .subscribe(settings=>this.data = settings);
  }

}
