import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'iux-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {

  @Input() content;
  @Input() offset;
  @Input() category;

  constructor() { }

  ngOnInit() {
  }

  fetch(){
    console.log("Asking to fetch offset "+this.offset+" for category "+this.category);
  }

}
