import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iux-tab-show-details',
  templateUrl: './tab-show-details.component.html',
  styleUrls: ['./tab-show-details.component.css']
})
export class TabShowDetailsComponent implements OnInit {

  @Input() program;

  constructor() { }

  ngOnInit() {
  }

}
