import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs";
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {



  constructor(private ctap:CtapService) { }

  ngOnInit() {

  }

}
