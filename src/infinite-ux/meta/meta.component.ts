import { Component, OnInit,Input} from '@angular/core';

@Component({
	selector: 'iux-meta',
	templateUrl: 'meta.component.html',
	styleUrls: ['meta.component.css']
})
export class MetaComponent implements OnInit {
	@Input() program;
	constructor() { }

	ngOnInit() {
	}

}
