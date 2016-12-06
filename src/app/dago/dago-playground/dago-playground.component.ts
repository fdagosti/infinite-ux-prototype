import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iux-dago-playground',
  templateUrl: './dago-playground.component.html',
  styleUrls: ['./dago-playground.component.css']
})
export class DagoPlaygroundComponent implements OnInit {

  private catid = {
    name: "My test",
    id:"urn:spvss:ih:tme:term:RECOMMENDED~TERM:urn:spvss:ih:tme:term:RECOMMENDED"
  };

  constructor() { }

  ngOnInit() {
  }

}
