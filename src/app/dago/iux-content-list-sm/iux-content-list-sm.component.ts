import {Component, OnInit, Input} from "@angular/core";
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-content-list-sm',
  templateUrl: 'iux-content-list-sm.component.html',
  styleUrls: ['iux-content-list-sm.component.css']
})
export class IUXContentListSmComponent implements OnInit {

  @Input() index;
  @Input() category = {name:"toto",id:0};


  constructor() { }

  ngOnInit() {

  }

}
