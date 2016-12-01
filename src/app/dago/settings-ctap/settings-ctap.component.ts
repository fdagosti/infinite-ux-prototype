import { Component, OnInit } from '@angular/core';
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-settings-ctap',
  templateUrl: './settings-ctap.component.html',
  styleUrls: ['./settings-ctap.component.css']
})
export class SettingsCtapComponent implements OnInit {

  constructor(private ctap:CtapService) { }

  private data;

  ngOnInit() {
    this.ctap.getSettings()
      .subscribe(settings=>this.data = settings);
  }

}
