import { Component, OnInit } from '@angular/core';
import {CtapService} from "../ctap.service";

@Component({
  selector: 'iux-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public ctap:CtapService) { }

  ngOnInit() {

  }

}
