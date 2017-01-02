import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iux-tab-more-like-this',
  templateUrl: 'tab-more-like-this.component.html',
  styleUrls: ['tab-more-like-this.component.css']
})
export class TabMoreLikeThisComponent implements OnInit {
  @Input() program;
  constructor() { }

  ngOnInit() {
  }

}
