import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'iux-settings-section',
  templateUrl: './settings-section.component.html',
  styleUrls: ['./settings-section.component.css']
})
export class SettingsSectionComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
