import {Component, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs";

@Component({
  selector: 'iux-settings-section',
  templateUrl: './settings-section.component.html',
  styleUrls: ['./settings-section.component.css']
})
export class SettingsSectionComponent implements OnInit {

  @Input() source:Observable<any>

  private data;

  constructor() { }

  ngOnInit() {
    this.source
      .subscribe(settings=>this.data = settings);
  }

}
