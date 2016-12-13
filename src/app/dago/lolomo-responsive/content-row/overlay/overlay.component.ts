import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'iux-overlay',
  templateUrl: 'overlay.component.html',
  styleUrls: ['overlay.component.css']
})
export class OverlayComponent implements OnInit {

  @Input() program

  constructor() { }

  ngOnInit() {
  }

}
