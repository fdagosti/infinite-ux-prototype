import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'iux-tab-overview',
  templateUrl: './tab-overview.component.html',
  styleUrls: ['./tab-overview.component.css']
})
export class TabOverviewComponent implements OnInit {

  @Input() program;

  constructor() { }

  ngOnInit() {
  }

}
