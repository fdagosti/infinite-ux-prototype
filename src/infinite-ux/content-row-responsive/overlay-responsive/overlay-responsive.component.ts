import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'iux-overlay-responsive',
  templateUrl: 'overlay-responsive.component.html',
  styleUrls: ['overlay-responsive.component.css']
})
export class OverlayResponsiveComponent implements OnInit {

    @Input() program

    constructor() { }

  ngOnInit() {
  }

}
