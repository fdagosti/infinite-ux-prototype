import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'iux-content-list-sm',
  templateUrl: 'iux-content-list-sm.component.html',
  styleUrls: ['iux-content-list-sm.component.css']
})
export class IUXContentListSmComponent implements OnInit {

  @Input() index;

  constructor() { }

  ngOnInit() {
  }

}
