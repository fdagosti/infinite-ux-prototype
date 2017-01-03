import { Component, OnInit } from '@angular/core';
import {LolomoService} from "../../infinite-ux/lolomo/lolomo.service";
import {HomeService} from "./home.service";

@Component({
  selector: 'iux-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: LolomoService, useClass:HomeService},
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
