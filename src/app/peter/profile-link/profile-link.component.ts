import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'iux-profile-link',
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.css']
})
export class ProfileLinkComponent implements OnInit {

  @Input() user

  constructor() { }

  ngOnInit() {
  }

}
