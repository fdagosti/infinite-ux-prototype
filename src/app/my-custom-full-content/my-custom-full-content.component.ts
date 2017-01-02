import { Component, OnInit } from '@angular/core';
import {FullContentService} from "../infinite-ux/full-content/full-content.service";
import {FlatDataService} from "./flat-data.service";

@Component({
  selector: 'iux-my-custom-full-content',
  templateUrl: './my-custom-full-content.component.html',
  styleUrls: ['./my-custom-full-content.component.css'],
  providers:[
    {provide: FullContentService, useClass:FlatDataService},
  ]
})
export class MyCustomFullContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
